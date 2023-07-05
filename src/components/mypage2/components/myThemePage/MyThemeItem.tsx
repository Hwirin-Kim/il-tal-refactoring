import React from "react";
import styled from "styled-components";
import { ThemeDataType } from "./MyThemeList";

interface MyThemeItemProps {
  data: ThemeDataType;
}

export default function MyThemeItem({ data }: MyThemeItemProps) {
  console.log(data);
  return (
    <Container>
      <Poster src={data.themeImgUrl} />
      <ThemeInfoTextWrapper>
        <CompanyLikeWrapper>
          <Company>{data.companyName}</Company>
          <Like>❤︎</Like>
        </CompanyLikeWrapper>
        <ThemeName>{data.themeName}</ThemeName>
        <Price>₩ 22,000</Price>
        <InfoWrapper>
          <Difficulty>★★★</Difficulty> | <RunningTime>70분</RunningTime> |{" "}
          <Genre>장르</Genre> |{" "}
          <Score>
            ★{data.themeScore} ({data.reviewCnt})
          </Score>
        </InfoWrapper>
        <ReservationWrapper>
          <ReservationTimeButton>10:00</ReservationTimeButton>
          <ReservationTimeButton>10:00</ReservationTimeButton>
          <ReservationTimeButton>10:00</ReservationTimeButton>
          <ReservationTimeButton>10:00</ReservationTimeButton>
          <ReservationTimeButton>10:00</ReservationTimeButton>
          <ReservationTimeButton>10:00</ReservationTimeButton>
          <ReservationTimeButton>10:00</ReservationTimeButton>
          <ReservationTimeButton>10:00</ReservationTimeButton>
          <ReservationTimeButton>10:00</ReservationTimeButton>
          <ReservationTimeButton>10:00</ReservationTimeButton>
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
const Like = styled.span``;

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
