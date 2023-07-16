import React from "react";
import styled from "styled-components";
import { devices } from "styles/devices";

interface ScoreProps {
  score: number;
  reviewCnt: number;
}

export default function Score({ score, reviewCnt }: ScoreProps) {
  return (
    <Contaienr>
      <Star>★</Star>
      {score} ({reviewCnt})
    </Contaienr>
  );
}

const Contaienr = styled.span`
  font-size: 0.62rem;
  font-weight: 300;
  margin: 0.5rem 0;

  @media ${devices.md} {
    font-size: 1rem;
  }
`;

const Star = styled.span`
  font-size: 0.62rem;
  color: var(--color-main);
  @media ${devices.md} {
    font-size: 1rem;
  }
`;
