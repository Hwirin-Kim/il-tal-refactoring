import ProgressBar from "components/main/common/ProgressBar";
import React from "react";
import styled from "styled-components";

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
  rank: number;
}

export default function BestUserGridItem({
  data,
  rank,
}: IBestUserGridItemProps) {
  console.log(data);
  return (
    <MenuGrid>
      <Rank>{rank}</Rank>
      <TitleBadge>
        <TitleBadgeImg src={data.mainBadgeImg} />
        {data.mainBadgeName}
      </TitleBadge>
      <Nickname>{data.nickname}</Nickname>
      <ProgressBar num={data.achieveBadgeCnt} maxNum={10}>
        {data.achieveBadgeCnt} / 10
      </ProgressBar>
      <AchievementCounter>{data.totalAchieveCnt}</AchievementCounter>
    </MenuGrid>
  );
}
const MenuGrid = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 0.5fr 1.5fr 1.5fr 5fr 1.5fr;
  p {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Rank = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleBadgeImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

const TitleBadgeName = styled.div``;

const Nickname = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AchievementCounter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
