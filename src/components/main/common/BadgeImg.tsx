import React from "react";
import styled from "styled-components";
import { devices } from "styles/devices";

interface IBadgeImgProps {
  url?: string;

  scale: number;
}

export default function BadgeImg({ url, scale }: IBadgeImgProps) {
  return <Badge url={url} scale={scale} />;
}

const Badge = styled.img<{
  url?: string;

  scale: number;
}>`
  background-image: url(${(props) => props.url || ""});
  background-size: cover;
  background-position: center;
  width: ${(props) => `${props.scale + 75}px`};
  height: ${(props) => `${props.scale + 75}px`};
  background-color: #dedede;
  border-radius: 50%;
  box-shadow: 6px 8px 8px -3px rgba(0, 0, 0, 0.51);
  -webkit-box-shadow: 6px 8px 8px -3px rgba(0, 0, 0, 0.51);
  -moz-box-shadow: 6px 8px 8px -3px rgba(0, 0, 0, 0.51);
  @media ${devices.md} {
    width: ${(props) => `${props.scale + 90}px`};
    height: ${(props) => `${props.scale + 90}px`};
  }
  @media ${devices.xlg} {
    width: ${(props) => `${props.scale + 100}px`};
    height: ${(props) => `${props.scale + 100}px`};
  }
`;
