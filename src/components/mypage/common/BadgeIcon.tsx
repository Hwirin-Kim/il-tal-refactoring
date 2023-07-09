import React from "react";
import styled from "styled-components";
import { devices } from "styles/devices";

interface IBadgeIconProps {
  mainBadgeImg: string;
}

export default function BadgeIcon({ mainBadgeImg }: IBadgeIconProps) {
  return <Container mainBadgeImg={mainBadgeImg} />;
}

const Container = styled.div<{ mainBadgeImg?: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-image: url(${(props) => props.mainBadgeImg});
  background-size: cover;
  background-position: center;
  background-color: grey;
  position: absolute;
  top: -40%;
  left: 20px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  @media${devices.md} {
    position: relative;
    display: block;
    left: 0;
    top: 0;
    width: 120px;
    height: 120px;
  }
  @media ${devices.lg} {
    width: 150px;
    height: 150px;
  }

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
    overflow: hidden;
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
