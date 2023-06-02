import React from "react";
import styled from "styled-components";

interface IProgressBarProps {
  children: React.ReactNode;
  num: number;
  maxNum: number;
}

export default function ProgressBar({
  children,
  num,
  maxNum,
}: IProgressBarProps) {
  const ratio = Math.floor((num / maxNum) * 100);
  return (
    <Container>
      <Bar ratio={ratio}>{children}</Bar>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background-color: #d6d6d6;
  display: flex;
  align-items: center;
  padding: 0.1rem;
  border-radius: 1rem;
`;

const Bar = styled.div<{ ratio: number }>`
  display: flex;
  align-items: center;
  padding: 0.3rem;
  background-color: white;
  border-radius: 1rem;
  font-size: 0.5rem;
  width: ${(props) => props.ratio + "%"};
`;
