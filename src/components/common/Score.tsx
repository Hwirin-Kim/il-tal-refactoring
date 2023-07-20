import React from "react";
import styled from "styled-components";
import { devices } from "styles/devices";

interface ScoreProps {
  score: number;
  reviewCnt: number;
}

export default function Score({ score, reviewCnt }: ScoreProps) {
  return (
    <Container>
      <Star>★</Star>
      {score} ({reviewCnt})
    </Container>
  );
}

const Container = styled.span`
  font-size: 0.62rem;
  font-weight: 300;

  @media ${devices.md} {
    font-size: 0.8rem;
  }
`;

const Star = styled.span`
  font-size: 0.62rem;
  color: var(--color-main);
  @media ${devices.md} {
    font-size: 0.8rem;
  }
`;
