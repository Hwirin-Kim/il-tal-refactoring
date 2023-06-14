import { useQuery } from "@tanstack/react-query";
import { getAchieve } from "api/mainApi";
import { useLoginCheck } from "components/context/LoginCheckContext";
import React from "react";
import styled from "styled-components";
import { devices } from "styles/devices";
import mainImg from "../../../../asset/main.png";
import MainUserInfo from "./MainUserInfo";

export default function MainBanner() {
  const initialUserInfo = {
    mainBadgeImg: "none",
    achieveBadgeCnt: 0,
    nickname: "Guest",
    totalAchieveCnt: 0,
    badgeImgUrl: [],
    mainBadgeName: "",
  };
  const { isLogin } = useLoginCheck();
  const { data, isLoading } = useQuery(
    ["getAchieve", isLogin],
    () => getAchieve(),
    {
      enabled: isLogin ? true : false,
    }
  );

  return (
    <Container>
      <BannerText>
        {isLogin ? (
          isLoading ? (
            <span>
              <p className="bold">Guest님</p>
              <p>탈출할 준비되셨나요?</p>
            </span>
          ) : (
            <span>
              <p className="bold">{data.nickname}님</p>
              <p>탈출할 준비되셨나요?</p>
            </span>
          )
        ) : (
          <span>
            <p className="bold">일상의 방탈출</p>
            <p>도전해보세요!</p>
          </span>
        )}
      </BannerText>
      <BannerImg src={mainImg} />
      {isLogin ? (
        <MainUserInfo data={data} blur={false} isLoading={isLoading} />
      ) : (
        <MainUserInfo data={initialUserInfo} blur={true} />
      )}
    </Container>
  );
}
const Container = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  height: 4rem;
  background-color: var(--color-main);
  @media ${devices.md} {
    background-color: transparent;
    height: 100%;
  }
`;

const BannerImg = styled.img`
  display: none;
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media ${devices.md} {
    display: inline;
    width: 100vw;
  }
`;

const BannerText = styled.div`
  display: none;
  white-space: pre-line;
  color: white;
  .bold {
    font-weight: bold;
  }
  p {
    margin: 1rem 0;
  }

  @media ${devices.md} {
    display: flex;
    font-size: 1.2rem;
    position: absolute;
    left: 5%;
    top: 10%;
  }
  @media ${devices.lg} {
    font-size: 2rem;
    top: 15%;
  }
`;
