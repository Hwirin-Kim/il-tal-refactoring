import React from "react";
import styled from "styled-components";
import { devices } from "styles/devices";

interface MyLikeThemeProps {
  img: string;
  topText: string;
  bottomText: string;

  onClick: () => void;
}

export default function MyLikeItem({
  img,
  topText,
  bottomText,

  onClick,
}: MyLikeThemeProps) {
  return (
    <Container onClick={onClick}>
      <BGImg src={img} />
      <TextWrapper>
        <TopText>{topText}</TopText>
        <BottomText>{bottomText}</BottomText>
      </TextWrapper>
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  width: 115px;
  height: 100px;
  position: relative;
  cursor: pointer;
  border-radius: 0.5rem;
  margin: 0.5rem;
  &:hover {
    box-shadow: 0 0 5px 3px rgba(6, 195, 135, 0.505);
  }

  @media ${devices.md} {
    width: 200px;
    height: 130px;
  }
  @media ${devices.lg} {
    width: 300px;
    height: 180px;
  }
`;

const BGImg = styled.div<{ src: string }>`
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  filter: brightness(40%);
`;

const TextWrapper = styled.div`
  position: absolute;
  width: 98%;
  display: flex;
  flex-direction: column;
  text-align: left;
  bottom: 0.5rem;
  left: 0.5rem;
`;

const TopText = styled.p`
  font-size: 0.8rem;

  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: rgba(255, 255, 255, 1);
  @media ${devices.md} {
    font-size: 1.2rem;
  }
`;

const BottomText = styled.p`
  font-size: 0.8rem;

  bottom: 0.1rem;
  color: rgba(255, 255, 255, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  margin-top: 0.5rem;
  @media ${devices.md} {
    font-size: 0.8rem;
  }
`;
