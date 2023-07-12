import React from "react";
import styled from "styled-components";
import { devices } from "styles/devices";

interface ISectionTitleProps {
  children: React.ReactNode;
  marginLeft?: number;
}

export default function SectionTitle({
  children,
  marginLeft,
}: ISectionTitleProps) {
  return <Text marginLeft={marginLeft}>{children}</Text>;
}

const Text = styled.p<{ marginLeft?: number }>`
  font-size: 1.2rem;
  margin: 1.5rem 0;
  margin-left: ${(props) => props.marginLeft && `${props.marginLeft}px`};
  font-weight: bold;
  @media ${devices.md} {
    font-size: 1.3rem;
  }
`;
