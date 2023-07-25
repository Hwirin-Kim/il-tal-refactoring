import React from "react";
import styled, { keyframes } from "styled-components";

export default function Badge() {
  return <BadgeImg />;
}

const rotateAndScaleAnimation = keyframes`
  0% {
    transform: rotateY(0deg) scale(1);
  }
  25% {
    transform: rotateY(720deg) scale(1.4);
  }
  50% {
    transform: rotateY(1440deg) scale(2);
  }
  75% {
    transform: rotateY(2160deg) scale(1.4);
  }
  100% {
    transform: rotateY(2520deg) scale(1);
  }
`;

const BadgeImg = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  background-color: teal;
  border-radius: 50%;
  transform-style: preserve-3d;
  transform-origin: center;
  animation: ${rotateAndScaleAnimation} 2.5s linear;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;

    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    border-radius: 50%;
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: translateX(-100%);
    animation: shine 3s infinite;
  }

  @keyframes shine {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
