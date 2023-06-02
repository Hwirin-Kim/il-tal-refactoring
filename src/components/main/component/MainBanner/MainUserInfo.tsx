import { useQuery } from "@tanstack/react-query";
import { getAchieve } from "api/mainApi";
import { useLoginCheck } from "components/context/LoginCheckContext";
import ProgressBar from "components/main/common/ProgressBar";
import React from "react";
import { filterProps } from "recharts/types/util/types";
import styled from "styled-components";
import { devices } from "styles/devices";

interface IUserDataType {
  mainBadgeImg: string;
  achieveBadgeCnt: number;
  nickname: string;
  totalAchieveCnt: number;
}
interface IMainUserInfoProps {
  data: IUserDataType;
  blur: boolean;
  isLoading?: boolean;
}

export default function MainUserInfo({
  data,
  blur,
  isLoading,
}: IMainUserInfoProps) {
  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      {blur && <LoginText>로그인 후 업적을 확인하세요!</LoginText>}
      <Wrapper blur={blur}>
        {data.mainBadgeImg === "none" ? (
          <NoneBadgeImg />
        ) : (
          <MainBadgeImg src={data.mainBadgeImg} />
        )}

        <TextProgressWrapper>
          <BannerText>
            <span>{data.nickname ? `${data.nickname}님` : "Guest님"}</span>{" "}
            탈출할 준비되셨나요?
          </BannerText>

          <ProgressBar num={data.totalAchieveCnt} maxNum={10}>
            {data.totalAchieveCnt}/10
          </ProgressBar>
        </TextProgressWrapper>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  height: 6rem;
  background-color: white;
  padding: 0.3rem;
  display: flex;
  align-items: center;
  position: absolute;
  left: 50;
  bottom: -3rem;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 5px rgba(41, 39, 39, 0.087);
`;
const Wrapper = styled.div<{ blur: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  ${(props) => props.blur && "filter:blur(1rem)"}
`;

const MainBadgeImg = styled.img`
  width: 75px;
  margin-left: 10px;
`;

const NoneBadgeImg = styled.div`
  width: 75px;
  height: 75px;
  margin-left: 10px;

  border-radius: 50%;
  background-color: grey;
`;

const TextProgressWrapper = styled.div`
  padding: 0 1.5rem;
  width: 250px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const BannerText = styled.div`
  margin: 10px 0;
  span {
    font-weight: bold;
  }
  @media ${devices.md} {
    font-size: 1.2rem;
  }
  @media ${devices.lg} {
    font-size: 1.5rem;
  }
`;

const LoginText = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 1.5rem;
`;
