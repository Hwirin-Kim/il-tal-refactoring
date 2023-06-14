import { useQuery } from "@tanstack/react-query";
import { getHOf } from "api/mainApi";
import SectionTitle from "components/main/common/SectionTitle";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BestUserGridItem from "./BestUserGridItem";

interface IBestUserData {
  achieveBadgeCnt: number;
  id: number;
  mainBadgeImg: string;
  mainBadgeName: string;
  nickname: string;
  totalAchieveCnt: number;
}

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
          <p>순위</p>
          <p>뱃지명</p>
          <p>닉네임</p>
          <p>프로그레스바</p>
          <p>성공횟수</p>
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
  width: 100%;
  padding: 0 10px;
`;

const MenuGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.5fr 1.5fr 1.5fr 5fr 1.5fr;
  p {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
