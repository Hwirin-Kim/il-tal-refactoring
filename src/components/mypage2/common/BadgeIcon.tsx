import React from "react";
import styled from "styled-components";

interface IBadgeIconProps {
  mainBadgeImg: string;
}

export default function BadgeIcon({ mainBadgeImg }: IBadgeIconProps) {
  return <Container mainBadgeImg={mainBadgeImg} />;
}

const Container = styled.div<{ mainBadgeImg?: string }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url(${(props) => props.mainBadgeImg});
  background-size: cover;
  background-position: center;
  background-color: grey;
  position: absolute;
  top: -40%;
  left: 20px;
`;
