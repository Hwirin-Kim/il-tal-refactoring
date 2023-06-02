import { useQuery } from "@tanstack/react-query";
import { getAchieve } from "api/mainApi";
import { useLoginCheck } from "components/context/LoginCheckContext";
import React from "react";
import styled from "styled-components";
import { devices } from "styles/devices";
import mainImg from "../../../../asset/main.png";
import MainUserInfo from "./MainUserInfo";
import mainNukki from "../../../../asset/main-nukki.png";

export default function MainBanner() {
  const initialUserInfo = {
    mainBadgeImg: "none",
    achieveBadgeCnt: 0,
    nickname: "Guest",
    totalAchieveCnt: 0,
  };
  const { isLogin } = useLoginCheck();
  const { data, isLoading } = useQuery(["getAchieve"], () => getAchieve());

  return (
    <Container>
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
  position: absolute;
  left: 1%;
  top: 5%;
  @media ${devices.md} {
    font-size: 1.2rem;
  }
  @media ${devices.lg} {
    font-size: 1.5rem;
  }
`;
