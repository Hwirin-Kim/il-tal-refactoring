import React from "react";
import styled from "styled-components";
import { IMyReviewData } from "./MyReviewList";

interface IMyReviewProps {
  data: IMyReviewData;
}

export default function MyReview({ data }: IMyReviewProps) {
  return (
    <Container>
      <ThemeName>{data.themeName}</ThemeName>
      <Comment>{data.comment}</Comment>
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 1rem;
`;

const ThemeName = styled.span`
  display: inline-block;
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.3rem;
`;
const Comment = styled.span`
  width: 100%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
