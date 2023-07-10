import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { devices } from "styles/devices";
import { IMyReviewData } from "./MyReviewList";

interface IMyReviewProps {
  data: IMyReviewData;
}

export default function MyReview({ data }: IMyReviewProps) {
  const navigator = useNavigate();
  const onClickToTheme = () => {
    navigator(`/theme/${data.id}`);
  };

  return (
    <Container onClick={onClickToTheme}>
      <ThemeName>{data.themeName}</ThemeName>
      <ScoreStars>{"★".repeat(data.score)}</ScoreStars>
      <Comment>{data.comment}</Comment>
      <PlayDate>{data.playDate}</PlayDate>
    </Container>
  );
}

const Container = styled.div`
  width: 7rem;
  margin: 0 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 0.5rem;
  border-radius: 1rem;
  /* border: 1px solid transparent; */
  border: 1px solid var(--color-grey-btn);
  cursor: pointer;
  &:hover {
    border: 1px solid var(--color-main);
  }
  @media ${devices.md} {
    width: 200px;
  }
  @media ${devices.lg} {
    width: 300px;
    padding: 1rem;
  }
`;

const ThemeName = styled.p`
  font-weight: bold;
  font-size: 0.9rem;
  padding: 0.1rem;
  margin-bottom: 0.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media ${devices.md} {
    font-size: 1.1rem;
  }
  @media ${devices.lg} {
    font-size: 1.2rem;
  }
`;
const Comment = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-wrap: break-word;
  font-size: 0.7rem;
  line-height: 1rem;
  height: 2.9rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  @media ${devices.md} {
    font-size: 0.8rem;
  }
  @media ${devices.lg} {
    font-size: 0.9rem;
  }
`;

const ScoreStars = styled.p`
  color: var(--color-main);
  font-size: 0.8rem;
  @media ${devices.md} {
    font-size: 0.9rem;
  }
  @media ${devices.lg} {
    font-size: 1rem;
  }
`;
const PlayDate = styled.p`
  font-size: 0.8rem;
  color: grey;
  @media ${devices.md} {
    font-size: 0.9rem;
  }
  @media ${devices.lg} {
    margin-top: 0.3rem;
    font-size: 1rem;
  }
`;
