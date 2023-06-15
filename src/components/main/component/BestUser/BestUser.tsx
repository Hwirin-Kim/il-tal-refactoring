import { useQuery } from "@tanstack/react-query";
import { getHOf } from "api/mainApi";
import MenuGrid from "components/main/common/MenuGrid";
import SectionTitle from "components/main/common/SectionTitle";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BestUserGridItem from "./BestUserGridItem";
import crown from "../../../../asset/img/crown.png";
import { devices } from "styles/devices";

interface IBestUserData {
  achieveBadgeCnt: number;
  id: number;
  mainBadgeImg: string;
  mainBadgeName: string;
  nickname: string;
  totalAchieveCnt: number;
}

const menuData = {
  nickname: "닉네임",
  titleBadge: "칭호",
  successRate: "달성률",
  successCnt: "성공횟수",
};

export default function BestUser() {
  const navigator = useNavigate();
  const bestUserData = useQuery(["bestUserData"], getHOf, {
    onSuccess: () => {},
    onError: (err) => {
      navigator("/error");
    },
  });
  if (bestUserData.isLoading) {
    return null;
  }

  return (
    <Container>
      <SectionTitle>명예의 전당</SectionTitle>
      <BestUserListSection>
        <MenuGrid>
          <MenuRankIcon src={crown} />
          <MenuTitle displayNone={true}>{menuData.titleBadge}</MenuTitle>
          <MenuTitle>{menuData.nickname}</MenuTitle>
          <MenuTitle>{menuData.successRate}</MenuTitle>
          <MenuTitle>{menuData.successCnt}</MenuTitle>
        </MenuGrid>
        {bestUserData.data.content.map((item: IBestUserData, index: number) => {
          return <BestUserGridItem data={item} rank={index + 1} />;
        })}
      </BestUserListSection>
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 100px;
`;

const BestUserListSection = styled.div`
  box-sizing: border-box;
  width: calc(100% - 20px);
  padding: 0 10px 20px 10px;
  border: 1px solid #d9d9d9;
  border-radius: 1rem;
  margin: 0 10px;
`;

const MenuRankIcon = styled.img`
  width: 2rem;
  height: 2rem;
`;

const MenuTitle = styled.div<{ displayNone?: boolean }>`
  display: ${(props) => (props.displayNone ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  @media ${devices.md} {
    display: flex;
    font-size: 1rem;
  }
`;
