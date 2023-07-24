import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import TitleText from "./TitleText";
import { CommentType } from "./CommentForm";

interface StarCountProps {
  title: string;
  cmt: CommentType;

  setCmt: Dispatch<SetStateAction<CommentType>>;
}

export default function StarCount({ title, setCmt, cmt }: StarCountProps) {
  // const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const ScoreList = [1, 2, 3, 4, 5];
  const onMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const Rating = Number(cmt.score);

  const onMouseLeave = () => {
    setHoverRating(0);
  };

  const onSaveRating = (index: number) => {
    setCmt({ ...cmt, score: index.toString() });
  };

  return (
    <Container>
      <TitleText>{title}</TitleText>
      {ScoreList.map((index) => {
        const filled = (hoverRating || Rating) >= index;

        return (
          <Star
            key={index}
            filled={filled}
            onMouseEnter={() => onMouseEnter(index)}
            onMouseLeave={() => onMouseLeave()}
            onClick={() => onSaveRating(index)}
          >
            ★
          </Star>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 1rem;
`;

const Star = styled.div<{ filled: boolean }>`
  cursor: pointer;
  display: inline-block;
  font-size: 1.5rem;
  color: ${(props) => (props.filled ? "gold" : "grey")};
`;
