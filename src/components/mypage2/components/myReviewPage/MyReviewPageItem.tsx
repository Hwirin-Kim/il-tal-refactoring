import React from "react";
import styled from "styled-components";
import CommentCard from "./CommentCard";
import { ReviewData } from "./MyReviewPageList";
import ThemeInfoCard from "./ThemeInfoCard";

interface MyReviewPageItemProps {
  reviewData: ReviewData;
}

export default function MyReviewPageItem({
  reviewData,
}: MyReviewPageItemProps) {
  return (
    <Container>
      <ThemeInfoCard
        themeImgUrl={reviewData.themeImgUrl}
        genre={reviewData.genre}
        themeName={reviewData.themeName}
        companyName={reviewData.companyName}
        themeScore={reviewData.themeScore}
        reviewCnt={reviewData.reviewCnt}
      />
      <CommentCard
        id={reviewData.reviewId}
        success={reviewData.success.toString()}
        hint={reviewData.hint}
        playDate={reviewData.playDate}
        difficulty={reviewData.difficulty}
        score={reviewData.score}
        comment={reviewData.comment}
      />
      <Divider />
    </Container>
  );
}

const Container = styled.div``;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: 2rem auto;
  background-color: #d1d1d1;
`;
