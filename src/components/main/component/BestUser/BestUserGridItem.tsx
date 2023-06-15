import MenuGrid from "components/main/common/MenuGrid";
import ProgressBar from "components/main/common/ProgressBar";
import React from "react";
import styled from "styled-components";
import { devices } from "styles/devices";

interface IBestUserData {
  achieveBadgeCnt: number;
  id: number;
  mainBadgeImg: string;
  mainBadgeName: string;
  nickname: string;
  totalAchieveCnt: number;
}

interface IBestUserGridItemProps {
  data: IBestUserData;
  rank: number | string;
}

export default function BestUserGridItem({
  data,
  rank,
}: IBestUserGridItemProps) {
  return (
    <MenuGrid>
      <Rank>{rank}</Rank>
      <TitleBadge>
        <TitleBadgeImg src={data.mainBadgeImg} />
        <TitleBadgeName>{data.mainBadgeName}</TitleBadgeName>
      </TitleBadge>
      <Nickname>{data.nickname}</Nickname>
      <ProgressBar num={data.achieveBadgeCnt} maxNum={10}>
        {data.achieveBadgeCnt} / 10
      </ProgressBar>
      <AchievementCounter>{data.totalAchieveCnt}</AchievementCounter>
    </MenuGrid>
  );
}

const Rank = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const TitleBadge = styled.div`
  display: none;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  @media ${devices.md} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const TitleBadgeImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const TitleBadgeName = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
`;

const Nickname = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 0.8rem;
`;

const AchievementCounter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
