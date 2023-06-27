import { useQuery } from "@tanstack/react-query";
import { getAllBadges } from "api/myAccount";
import React from "react";
import styled from "styled-components";

export default function MyBadgeList() {
  const myBadges = useQuery(["myBadges"], getAllBadges);
  console.log(myBadges);
  return <Container></Container>;
}
const Container = styled.section``;
