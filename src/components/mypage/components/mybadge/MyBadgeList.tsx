import { useQuery } from "@tanstack/react-query";
import { getMemberBadges } from "api/myAccount";
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
  const myBadges = useQuery(["myBadges"], getMemberBadges);
  if (myBadges.isLoading) {
    return null;
  }
  return (
    <Container>
      <SectionTitle>내가 획득한 뱃지</SectionTitle>
      {myBadges.data.map((data: IBadgeData) => {
        return <MyBadge data={data} key={data.id} />;
      })}
    </Container>
  );
}
const Container = styled.section`
  margin-top: 2rem;
`;
