import React from "react";
import styled from "styled-components";

interface MyLikeThemeProps {
  img: string;
  topText: string;
  bottomText: string;
}

export default function MyLikeItem({
  img,
  topText,
  bottomText,
}: MyLikeThemeProps) {
  return (
    <Container>
      <BGImg src={img} />
      <TopText>{topText}</TopText>
      <BottomText>{bottomText}</BottomText>
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  width: 115px;
  height: 85px;
  position: relative;
  margin: 0.15rem;
`;

const BGImg = styled.div<{ src: string }>`
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;

  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  filter: brightness(50%);
`;

const TopText = styled.p`
  position: absolute;
  font-size: 0.8rem;
  left: 0.5rem;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  top: 50%;
  color: rgba(255, 255, 255, 1);
`;

const BottomText = styled.p`
  position: absolute;
  font-size: 0.8rem;
  left: 0.5rem;
  bottom: 0.1rem;
  color: rgba(255, 255, 255, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;
