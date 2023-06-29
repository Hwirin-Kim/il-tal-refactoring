import { useQuery } from "@tanstack/react-query";
import { getAllBadges, getMemberBadges } from "api/myAccount";
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
  const myBadges = useQuery(["myBadges"], getMemberBadges);

  const activeBadges = (
    myBadgeArr: IBadgeData[],
    currentId: number
  ): boolean => {
    return myBadgeArr.some((badge) => badge.id === currentId) ? true : false;
  };

  if (totalBadges.isLoading || myBadges.isLoading) {
    return null;
  }
  return (
    <Container>
      {totalBadges.data.map((data: IBadgeData) => {
        const isActive = activeBadges(myBadges.data, data.id);
        return <MyBadge data={data} key={data.id} isActive={isActive} />;
      })}
    </Container>
  );
}
const Container = styled.section``;
