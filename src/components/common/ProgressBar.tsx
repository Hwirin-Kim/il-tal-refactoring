import React from "react";
import styled from "styled-components";
import { devices } from "styles/devices";

interface IProgressBarProps {
  children: React.ReactNode;
  num: number;
  maxNum: number;
  percent?: boolean;
}
/**
 * children에 num / maxNum 텍스트로 넣어서 사용
 * @param num 분자에 해당하는 숫자
 * @param maxNum 분모에 해당하는 숫자
 * @param percent boolean true인 경우 text가 퍼센트로 보임
 * @returns
 */

export default function ProgressBar({
  children,
  num,
  maxNum,
  percent,
}: IProgressBarProps) {
  const ratio = Math.floor((num / maxNum) * 100);
  return (
    <Container>
      <Bar ratio={ratio}></Bar>
      <Text>{percent ? ratio + "%" : children}</Text>
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  background-color: #d6d6d6;
  display: flex;
  align-items: center;
  padding: 0.15rem;
  border-radius: 1rem;
  position: relative;
  @media ${devices.md} {
    padding: 0.2rem;
  }
`;

const Bar = styled.div<{ ratio: number }>`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 1.3rem;
  height: 1.3rem;
  width: ${(props) => props.ratio + "%"};
  @media ${devices.md} {
    font-size: 0.8rem;
    border-radius: 1.5rem;
    height: 1.5rem;
  }
`;

const Text = styled.span`
  position: absolute;
  right: 0.5rem;
  font-size: 0.8rem;
  font-weight: bold;

  @media ${devices.md} {
    font-size: 1rem;
    right: 1rem;
  }
`;
