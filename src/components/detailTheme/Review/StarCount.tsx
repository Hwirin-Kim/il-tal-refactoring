import React, { useState } from "react";
import styled from "styled-components";
import TitleText from "./TitleText";

interface StarCountProps {
  title: string;
}

export default function StarCount({ title }: StarCountProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const ScoreList = [1, 2, 3, 4, 5];
  const onMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const onMouseLeave = () => {
    setHoverRating(0);
  };

  const onSaveRating = (index: number) => {
    setRating(index);
  };

  return (
    <Container>
      <TitleText>{title}</TitleText>
      {ScoreList.map((index) => {
        const filled = (hoverRating || rating) >= index;

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
  font-size: 30px;
  color: ${(props) => (props.filled ? "gold" : "grey")};
`;
