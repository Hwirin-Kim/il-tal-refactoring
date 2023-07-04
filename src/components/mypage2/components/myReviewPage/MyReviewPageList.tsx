import { useQuery } from "@tanstack/react-query";
import { getMyReviews } from "api/myAccount";
import { myReviewPages } from "api/store";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import MyReviewPageItem from "./MyReviewPageItem";

export interface ReviewData {
  comment: string;
  companyName: string;
  difficulty: number;
  genre: string;
  hint: number;
  playDate: string;
  reviewCnt: number;
  reviewId: number;
  score: number;
  success: true;
  themeId: number;
  themeImgUrl: string;
  themeName: string;
  themeScore: number;
}

export default function MyReviewPageList() {
  const [page, setPage] = useRecoilState(myReviewPages);

  const myReviews = useQuery(["myReviewPage"], () => getMyReviews(page));
  console.log(myReviews, page, "왜안될까요");
  if (myReviews.isLoading) {
    return null;
  }

  return (
    <Container>
      {myReviews.data.content.map((reviewData: ReviewData, index: number) => {
        return <MyReviewPageItem key={index} reviewData={reviewData} />;
      })}
    </Container>
  );
}
const Container = styled.div``;
