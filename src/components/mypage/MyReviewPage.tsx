import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getMyEscapeCnt } from "api/myAccount";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { devices } from "styles/devices";
import MyReviewPageList from "./components/myReviewPage/MyReviewPageList";

export default function MyReviewPage() {
  const myEscapeCnt = useQuery(["myEscapeCnt"], getMyEscapeCnt);
  const [totalCnt, setTotalCnt] = useState(0);
  const [successCnt, setSuccessCnt] = useState(0);
  const [failCnt, setFailCnt] = useState(0);

  useEffect(() => {
    if (!myEscapeCnt.isLoading) {
      setSuccessCnt(myEscapeCnt.data.successCnt);
      setFailCnt(myEscapeCnt.data.failCnt);
      setTotalCnt(myEscapeCnt.data.successCnt + myEscapeCnt.data.failCnt);
    }
  }, [myEscapeCnt]);

  if (myEscapeCnt.isLoading) {
    return null;
  }

  return (
    <Container>
      <PageTitle>내가 남긴 리뷰</PageTitle>
      <InfoWrapper>
        <TotalText>총 {totalCnt}회</TotalText>
        <SuccessFailCnt>성공 {successCnt}회</SuccessFailCnt>
        <SuccessFailCnt>실패 {failCnt}회</SuccessFailCnt>
      </InfoWrapper>
      <MyReviewPageList />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0.8rem;
  margin-bottom: 3rem;
`;

const PageTitle = styled.div`
  margin-top: 0.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  @media ${devices.md} {
    font-size: 1.5rem;
  }
`;

const InfoWrapper = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 3rem;
  @media ${devices.md} {
    margin-top: 1rem;
  }
`;

const TotalText = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
  margin-right: 0.5rem;
  @media ${devices.md} {
    font-size: 1rem;
  }
`;

const SuccessFailCnt = styled.span`
  font-size: 0.7rem;
  color: grey;
  margin-right: 0.5rem;
  @media ${devices.md} {
    font-size: 0.9rem;
  }
`;
