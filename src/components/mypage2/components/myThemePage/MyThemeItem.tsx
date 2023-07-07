import { useMutation, useQueryClient } from "@tanstack/react-query";
import { wishTheme } from "api/ThemeApi";
import { useLoginCheck } from "components/context/LoginCheckContext";
import React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { ThemeDataType } from "./MyThemeList";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";

interface MyThemeItemProps {
  data: ThemeDataType;
}

export default function MyThemeItem({ data }: MyThemeItemProps) {
  const { isLogin } = useLoginCheck();
  const queryClient = useQueryClient();
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
  return (
    <Container>
      <Poster src={data.themeImgUrl} />
      <ThemeInfoTextWrapper>
        <CompanyLikeWrapper>
          <Company>{data.companyName}</Company>
          <Like onClick={themeLikeOnlyMember}>
            {data.themeLikeCheck ? <BsSuitHeartFill /> : <BsSuitHeart />}
          </Like>
        </CompanyLikeWrapper>
        <ThemeName>{data.themeName}</ThemeName>
        <Price>₩ {data.price}</Price>
        <InfoWrapper>
          <Difficulty>★★★{data.difficulty}</Difficulty> |{" "}
          <RunningTime>{data.playTime}분</RunningTime> |{" "}
          <Genre>{data.genre}</Genre> |{" "}
          <Score>
            ★{data.themeScore} ({data.reviewCnt})
          </Score>
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
  margin-bottom: 1rem;
`;

const Poster = styled.img`
  width: 4.5rem;
  height: 6.3rem;
  background-color: grey;
  border-radius: 0.5rem;
  flex-shrink: 0;
`;

const ThemeInfoTextWrapper = styled.div`
  flex-grow: 1;
  padding: 0.2rem 0;
  margin-left: 0.5rem;
`;

const CompanyLikeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Company = styled.span`
  font-size: 0.62rem;
  font-weight: 300;
`;
const Like = styled.span`
  color: var(--color-main);
  cursor: pointer;
`;

const ThemeName = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
`;

const Price = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
`;

const InfoWrapper = styled.div`
  font-size: 0.62rem;
  font-weight: 300;
`;

const Difficulty = styled.span`
  font-size: 0.62rem;
  font-weight: 300;
`;

const RunningTime = styled.span`
  font-size: 0.62rem;
  font-weight: 300;
`;

const Genre = styled.span`
  font-size: 0.62rem;
  font-weight: 300;
`;

const Score = styled.span`
  font-size: 0.62rem;
  font-weight: 300;
`;

const ReservationWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const ReservationTimeButton = styled.span`
  margin: 0.1rem 0.2rem;
  padding: 0.1rem;
  font-size: 0.7rem;
  border-radius: 0.4rem;
  border: 1px solid var(--color-grey-btn);
`;

const NoReservation = styled.p`
  font-size: 0.8rem;
  margin-top: 0.3rem;
`;
