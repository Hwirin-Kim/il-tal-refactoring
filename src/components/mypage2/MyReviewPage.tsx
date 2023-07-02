import { useQuery } from "@tanstack/react-query";
import { getMyReview } from "api/myAccount";
import React from "react";
import styled from "styled-components";

export default function MyReviewPage() {
  const myReviews = useQuery(["myReviews"], getMyReview);

  if (myReviews.isLoading) {
    return null;
  }

  return (
    <Container>
      <PageTitle>내가 남긴 리뷰</PageTitle>
      <InfoWrapper>
        <TotalText>총 90회</TotalText>
        <SuccessFailCnt>성공 32회</SuccessFailCnt>
        <SuccessFailCnt>실패 58회</SuccessFailCnt>
      </InfoWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0.8rem;
`;

const PageTitle = styled.div`
  margin-top: 0.5rem;
  font-size: 1.3rem;
  font-weight: bold;
`;

const InfoWrapper = styled.div`
  margin-top: 0.5rem;
`;

const TotalText = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
  margin-right: 0.5rem;
`;

const SuccessFailCnt = styled.span`
  font-size: 0.7rem;
  color: grey;
  margin-right: 0.5rem;
`;
