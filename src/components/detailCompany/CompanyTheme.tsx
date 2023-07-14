import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
// import { loginCheck } from "../../api/store";
import { wishTheme } from "../../api/ThemeApi";
import lock from "../../asset/lock.png";
import Swal from "sweetalert2";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { CompanyThemeProps } from "components/types";
import { useLoginCheck } from "components/context/LoginCheckContext";
import { devices } from "styles/devices";
import { addComma } from "utils/addComma";

const CompanyTheme = ({ theme }: CompanyThemeProps) => {
  const queryClient = useQueryClient();
  const navigator = useNavigate();
  const themeLike = useMutation(() => wishTheme({ themeId: theme.id }), {
    onSuccess: (res) => {
      queryClient.invalidateQueries(["getDetailCompany"]);
    },
    onError: () => {
      Swal.fire({
        title: "전송 실패",
        text: "좋아요 전송에 실패하였습니다.😢",
        icon: "warning",
      });
    },
  });

  //로그인 유무 판별
  const { isLogin } = useLoginCheck();

  //좋아요 회원만 가능하도록 알람띄우기
  const likeOnlyMemeber = () => {
    if (isLogin) {
      themeLike.mutate();
    } else {
      Swal.fire({
        title: "로그인 후 이용하세요!",
        text: "비회원은 좋아요를 보낼수 없어요 😢",
        icon: "warning",
      });
    }
  };

  const onClickToPage = () => {
    navigator(`/theme/${theme.id}`);
  };

  return (
    <Container>
      <Poster src={theme.themeImgUrl} onClick={onClickToPage} />
      <ThemeInfoTextWrapper>
        <CompanyLikeWrapper>
          <Company>{theme.companyName}</Company>
          <Like onClick={likeOnlyMemeber}>
            {theme.themeLikeCheck ? <BsSuitHeartFill /> : <BsSuitHeart />}
          </Like>
        </CompanyLikeWrapper>
        <BoldText onClick={onClickToPage}>{theme.themeName}</BoldText>
        <Genre>{theme.genre}</Genre>
        <BoldText onClick={onClickToPage}>₩ {addComma(theme.price)}</BoldText>
        <InfoWrapper>
          <InfoItem>
            {[...Array(Math.round(theme.difficulty))].map((_, index) => {
              return <LockImg src={lock} alt="difficulty" key={index} />;
            })}
          </InfoItem>
          <DivisionBar> | </DivisionBar>
          <InfoItem>{theme.playTime}분</InfoItem> <DivisionBar> | </DivisionBar>
          <InfoItem>
            ★{theme.themeScore} ({theme.reviewCnt})
          </InfoItem>
        </InfoWrapper>
        <ReservationWrapper>
          {theme.reservationDay1[0] === "" ? (
            <NoReservation>예약 정보가 없습니다!</NoReservation>
          ) : (
            theme.reservationDay1.map((time) => {
              return (
                <ReservationTimeButton key={time}>{time}</ReservationTimeButton>
              );
            })
          )}
        </ReservationWrapper>
      </ThemeInfoTextWrapper>
    </Container>
  );
};

export default CompanyTheme;

const Container = styled.div`
  width: 100%;
  display: flex;

  margin-bottom: 1rem;
  border-radius: 0.5rem;
  @media ${devices.md} {
    height: 100%;
    flex-direction: column;
    border: 1px solid rgb(224, 224, 224);
    font-size: 1.3rem;
    box-sizing: border-box;

    &:hover {
      border: 1px solid var(--color-main);
    }
  }
`;

const Poster = styled.img`
  width: 5rem;
  height: 7rem;
  background-color: grey;
  border-radius: 0.5rem;
  flex-shrink: 0;
  object-fit: cover;
  cursor: pointer;

  @media ${devices.md} {
    width: 100%;
    height: 15rem;
  }
`;

const ThemeInfoTextWrapper = styled.div`
  flex-grow: 1;
  padding: 0.2rem 0;
  margin-left: 1rem;
`;

const CompanyLikeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${devices.md} {
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const Company = styled.span`
  font-size: 0.62em;
  font-weight: 300;
`;
const Like = styled.span`
  color: var(--color-main);
  cursor: pointer;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  @media ${devices.md} {
    font-size: 1.2rem;
    margin-right: 0.5rem;
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

const BoldText = styled.p`
  font-size: 0.8em;
  font-weight: bold;
  cursor: pointer;

  @media ${devices.md} {
    margin-bottom: 0.5rem;
  }
`;

const Genre = styled.p`
  font-size: 0.62em;
  font-weight: 300;
  margin: 0.3rem 0;
  @media ${devices.md} {
    margin-bottom: 0.5rem;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0.3rem 0;
`;

const InfoItem = styled.span`
  font-size: 0.62em;
  font-weight: 300;
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

const LockImg = styled.img`
  width: 0.6rem;
  height: 0.6rem;
  @media ${devices.md} {
    width: 0.8rem;
    height: 0.8rem;
  }
`;
