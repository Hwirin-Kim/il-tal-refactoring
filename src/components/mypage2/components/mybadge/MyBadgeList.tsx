import { useQuery } from "@tanstack/react-query";
import { getAllBadges, getMemberBadges } from "api/myAccount";
import SectionTitle from "components/common/SectionTitle";
import React from "react";
import styled from "styled-components";
import MyBadge from "./MyBadge";

export interface IBadgeData {
  id: number;
  badgeImgUrl: string;
  badgeName: string;
  badgeExplain: string;
  badgeGoal: number;
}

export default function MyBadgeList() {
  const totalBadges = useQuery(["totalBadges"], getAllBadges);

  if (totalBadges.isLoading) {
    return null;
  }
  return (
    <Container>
      <SectionTitle>내가 획득한 뱃지</SectionTitle>
      {totalBadges.data.map((data: IBadgeData) => {
        return <MyBadge data={data} key={data.id} />;
      })}
    </Container>
  );
}
const Container = styled.section``;
