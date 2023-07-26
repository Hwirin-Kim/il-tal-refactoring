import styled from "styled-components";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { wishTheme } from "../../api/ThemeApi";
import { useRecoilState, useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import { useInView } from "react-intersection-observer";
import { useLoginCheck } from "components/context/LoginCheckContext";
import Score from "components/common/Score";
import { ThemeDataType } from "components/mypage/components/myThemePage/MyThemeList";
import { devices } from "styles/devices";
import { dayState } from "api/store";
import lock from "../../asset/lock.png";

interface ThemePosterProps {
  theme: Theme;
  queryKey: any;
}

export interface Theme {
  companyName: string;
  difficulty: number;
  genre: string;
  id: number;
  playTime: number;
  price: number;
  themeUrl: string;
  reservationDay1: string[];
  reservationDay2: string[];
  reservationDay3: string[];
  reservationDay4: string[];
  reservationDay5: string[];
  reservationDay6: string[];
  reservationDay7: string[];
  reviewCnt: number;
  themeImgUrl: string;
  themeLikeCheck: boolean;
  themeName: string;
  themeScore: number;
}

const ThemePoster = ({ theme, queryKey }: ThemePosterProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const day = useRecoilValue(dayState);
  console.log(day);
  //좋아요 기능 mutation
  const themeLike = useMutation((themeId: number) => wishTheme({ themeId }), {
    onSuccess: (res) => {
      queryClient.invalidateQueries(queryKey);
    },
    onMutate: async (themeId) => {
      await queryClient.cancelQueries(queryKey);
      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldData: any) => {
        return {
          ...oldData,
          data: {
            ...oldData.data,
            content: oldData.data.content.map((theme: ThemeDataType) => {
              if (theme.id === themeId) {
                return {
                  ...theme,
                  themeLikeCheck: !theme.themeLikeCheck,
                };
              }
              return theme;
            }),
          },
        };
      });
      return previousData;
    },
  });

  //로그인 유무 판별
  const { isLogin } = useLoginCheck();
  //좋아요 회원만 가능하도록 알람띄우기
  const likeOnlyMember = (id: number) => {
    if (isLogin) {
      themeLike.mutate(id);
    } else {
      Swal.fire({
        title: "로그인 후 이용하세요!",
        text: "비회원은 좋아요를 보낼수 없어요 😢",
        icon: "warning",
      });
    }
  };

  //화면에 보일때 보여줄 토글state
  const [showList, setShowList] = useState(false);

  //옵저버 스테이트
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  //옵저버에 감지되면 showList true로 상태변경 (이미지 Lazy loading)
  useEffect(() => {
    if (inView && !showList) {
      setShowList(true);
    }
  }, [inView, showList]);

  type ReservationDay =
    | "reservationDay1"
    | "reservationDay2"
    | "reservationDay3"
    | "reservationDay4"
    | "reservationDay5"
    | "reservationDay6"
    | "reservationDay7";
  const reservationIndex = (): ReservationDay => {
    if (day === "") {
      return "reservationDay1";
    }
    return `reservationDay${day}` as ReservationDay;
  };
  return (
    <Container>
      <ThemePic
        src={theme.themeImgUrl}
        alt="themePoster"
        ref={ref}
        onClick={() => navigate(`/theme/${theme.id}`)}
      />

      <ThemeTextWrap>
        <CompanyName>{theme.companyName}</CompanyName>
        <ThemeName onClick={() => navigate(`/theme/${theme.id}`)}>
          {theme.themeName}
        </ThemeName>
        <Genre>{theme.genre}</Genre>
        <ThemeTextBottom>
          <InfoItem>
            {[...Array(Math.round(theme.difficulty))].map((_, index) => {
              return <LockImg src={lock} alt="difficulty" key={index} />;
            })}
          </InfoItem>
          <DivisionBar>|</DivisionBar>
          <InfoItem>{theme.playTime}분</InfoItem>
          <DivisionBar>|</DivisionBar>
          <Score score={theme.themeScore} reviewCnt={theme.reviewCnt} />
        </ThemeTextBottom>
        <ReservationWrapper>
          {theme[reservationIndex()][0] === "" ? (
            <NoReservation>예약 정보가 없습니다!</NoReservation>
          ) : (
            theme[reservationIndex()].map((time) => {
              return (
                <ReservationTimeButton key={time}>{time}</ReservationTimeButton>
              );
            })
          )}
        </ReservationWrapper>
      </ThemeTextWrap>
      <BtnWrapper>
        <Btn onClick={() => likeOnlyMember(theme.id)}>
          {theme.themeLikeCheck ? (
            <HeartIcon textColor={theme.themeLikeCheck}>
              <BsSuitHeartFill />
            </HeartIcon>
          ) : (
            <HeartIcon textColor={theme.themeLikeCheck}>
              <BsSuitHeart />
            </HeartIcon>
          )}
        </Btn>
        <Btn bgColor={true} onClick={() => window.open(theme.themeUrl)}>
          예약
        </Btn>
      </BtnWrapper>
    </Container>
  );
};

export default ThemePoster;

const Container = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.5rem;
  overflow: hidden;
  box-sizing: border-box;
  &:hover {
    border: 1px solid var(--color-main);
  }
`;

const ThemePic = styled.img`
  height: 13rem;
  width: 100%;
  border: none;
  object-fit: cover;
  cursor: pointer;
`;

const ThemeTextWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0.5rem;
`;
const CompanyName = styled.span`
  color: grey;
  font-size: 0.8rem;
`;
const ThemeName = styled.span`
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;
const Genre = styled.div`
  margin-top: 0.1rem;
  font-size: 0.8rem;
  color: grey;
  @media ${devices.md} {
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
  }
`;
const ThemeTextBottom = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0.3rem 0;
`;

const ReservationWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  @media ${devices.md} {
    margin-top: 0.5rem;
  }
`;

const ReservationTimeButton = styled.span`
  margin: 0.1rem 0.2rem 0.1rem 0;
  padding: 0.1rem;
  font-size: 0.7em;
  border-radius: 0.4rem;
  border: 1px solid var(--color-grey-btn);
  @media ${devices.md} {
    padding: 0.1rem 0.2rem;
  }
`;

const NoReservation = styled.p`
  font-size: 0.7em;
  margin-top: 0.3rem;
`;

const InfoItem = styled.span`
  font-size: 0.62em;
  font-weight: 300;
  @media ${devices.md} {
    font-size: 0.8em;
  }
`;

const LockImg = styled.img`
  width: 0.6rem;
  height: 0.6rem;
  @media ${devices.md} {
    width: 0.8rem;
    height: 0.8rem;
  }
`;

const DivisionBar = styled.span`
  font-weight: 300;
  color: #c9c9c9;
  margin: 0 0.3rem;
  font-size: 0.8rem;
  @media ${devices.md} {
    font-size: 1rem;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: 0.3rem;
`;

const Btn = styled.button<{ bgColor?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.bgColor ? "var(--color-main)" : "white"};
  border: ${(props) =>
    props.bgColor
      ? "1px solid var(--color-main);"
      : "1px solid var(--color-border);"};
  ${(props) => props.bgColor && "color:white"};
  width: 4.3rem;
  height: 1.5rem;
  border-radius: 0.3rem;
  margin: 0 0.5rem;
  cursor: pointer;
`;

const HeartIcon = styled.span<{ textColor: boolean }>`
  color: ${(props) => (props.textColor ? "var(--color-main)" : "black")};
  margin-right: 0.15rem;
`;
