import { useQuery } from "@tanstack/react-query";
import { getMyReview } from "api/myAccount";
import SectionTitle from "components/common/SectionTitle";
import React from "react";
import styled from "styled-components";
import MyReview from "./MyReview";

export interface IMyReviewData {
  comment: string;
  difficulty: number;
  id: number;
  playDate: string;
  playTime: number;
  score: number;
  success: boolean;
  themeImgUrl: string;
  themeName: string;
}

export default function MyReviewList() {
  const myReviews = useQuery(["myReviews"], getMyReview);

  console.log(myReviews.data);

  if (myReviews.isLoading) {
    return null;
  }

  return (
    <Container>
      <SectionTitle>내가 남긴 리뷰</SectionTitle>
      {myReviews.data.map((data: IMyReviewData, index: number) => {
        return <MyReview key={index} data={data} />;
      })}
    </Container>
  );
}

const Container = styled.section``;
