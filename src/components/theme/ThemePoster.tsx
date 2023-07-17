import styled from "styled-components";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { wishTheme } from "../../api/ThemeApi";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import { useInView } from "react-intersection-observer";
import { useLoginCheck } from "components/context/LoginCheckContext";
import Score from "components/common/Score";
import { ThemeDataType } from "components/mypage/components/myThemePage/MyThemeList";

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

  //좋아요 기능 mutation
  const themeLike = useMutation((themeId: number) => wishTheme(themeId), {
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
          <Score score={theme.themeScore} reviewCnt={theme.reviewCnt} />
          <div className="like" onClick={() => likeOnlyMember(theme.id)}>
            {theme.themeLikeCheck ? (
              <BsSuitHeartFill color={"var(--color-main)"} />
            ) : (
              <BsSuitHeart />
            )}
          </div>
        </ThemeTextBottom>
      </ThemeTextWrap>
    </Container>
  );
};

export default ThemePoster;

const Container = styled.div`
  width: 100%;
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
  height: 15rem;
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
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: grey;
`;
const ThemeTextBottom = styled.div`
  width: 100%;
  font-size: 20px;

  display: flex;
  justify-content: space-between;
`;
