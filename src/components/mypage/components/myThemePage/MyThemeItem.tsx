import { useMutation, useQueryClient } from "@tanstack/react-query";
import { wishTheme } from "api/ThemeApi";
import { useLoginCheck } from "components/context/LoginCheckContext";
import React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { ThemeDataType } from "./MyThemeList";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { devices } from "styles/devices";
import lock from "../../../../asset/lock.png";
import { useNavigate } from "react-router-dom";

interface MyThemeItemProps {
  data: ThemeDataType;
}

export default function MyThemeItem({ data }: MyThemeItemProps) {
  const { isLogin } = useLoginCheck();
  const queryClient = useQueryClient();
  const navigator = useNavigate();
  const themeLike = useMutation((themeId: number) => wishTheme({ themeId }), {
    onMutate: async (themeId) => {
      // Optimistic update: 로컬 데이터를 미리 업데이트
      await queryClient.cancelQueries(["myThemes"]); // 현재 실행 중인 쿼리를 취소

      const previousData = queryClient.getQueryData(["myThemes"]); // 현재 쿼리 데이터를 저장

      queryClient.setQueryData(["myThemes"], (oldData: any) => {
        return {
          ...oldData,
          pages: oldData.pages.map((pageData: any) => {
            return {
              ...pageData,
              content: pageData.content.filter(
                (theme: ThemeDataType) => theme.id !== themeId
              ),
            };
          }),
        };
      });

      return { previousData };
    },
    onError: (err, variables, context) => {
      // 서버 요청이 실패한 경우, 로컬 데이터를 이전 상태로 롤백
      if (context?.previousData) {
        queryClient.setQueryData(["myThemes"], context.previousData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myThemes"]);
    },
  });
  const themeLikeOnlyMember = () => {
    if (isLogin) {
      themeLike.mutate(data.id);
    } else {
      Swal.fire({
        title: "로그인 후 이용하세요!",
        text: "비회원은 좋아요를 보낼수 없어요 😢",
        icon: "warning",
      });
    }
  };

  const onClickToPage = () => {
    navigator(`/theme/${data.id}`);
  };

  return (
    <Container>
      <Poster src={data.themeImgUrl} onClick={onClickToPage} />
      <ThemeInfoTextWrapper>
        <CompanyLikeWrapper>
          <Company>{data.companyName}</Company>
          <Like onClick={themeLikeOnlyMember}>
            {data.themeLikeCheck ? <BsSuitHeartFill /> : <BsSuitHeart />}
          </Like>
        </CompanyLikeWrapper>
        <BoldText onClick={onClickToPage}>{data.themeName}</BoldText>
        <Genre>{data.genre}</Genre>
        <BoldText onClick={onClickToPage}>₩ {data.price}</BoldText>
        <InfoWrapper>
          <InfoItem>
            {[...Array(Math.round(data.difficulty))].map((_, index) => {
              return <LockImg src={lock} alt="difficulty" key={index} />;
            })}
          </InfoItem>
          <DivisionBar> | </DivisionBar>
          <InfoItem>{data.playTime}분</InfoItem> <DivisionBar> | </DivisionBar>
          <InfoItem>
            ★{data.themeScore} ({data.reviewCnt})
          </InfoItem>
        </InfoWrapper>
        <ReservationWrapper>
          {data.reservationDay1[0] === "" ? (
            <NoReservation>예약 정보가 없습니다!</NoReservation>
          ) : (
            data.reservationDay1.map((time) => {
              return (
                <ReservationTimeButton key={time}>{time}</ReservationTimeButton>
              );
            })
          )}
        </ReservationWrapper>
      </ThemeInfoTextWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;

  margin-bottom: 2rem;
  border-radius: 0.5rem;
  @media ${devices.md} {
    border: 1px solid rgb(224, 224, 224);
    font-size: 1.3rem;
    box-sizing: border-box;
    padding-right: 0.5rem;
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
  cursor: pointer;

  @media ${devices.md} {
    width: 10rem;
    height: 13rem;
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
