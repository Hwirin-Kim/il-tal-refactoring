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
  @media${devices.md} {
    position: static;
    display: block;
    width: 120px;
    height: 120px;
  }
  @media ${devices.lg} {
    position: static;
    width: 150px;
    height: 150px;
  }
`;
