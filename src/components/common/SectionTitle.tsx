import React from "react";
import styled from "styled-components";
import { devices } from "styles/devices";

interface ISectionTitleProps {
  children: React.ReactNode;
}

export default function SectionTitle({ children }: ISectionTitleProps) {
  return <Text>{children}</Text>;
}

const Text = styled.p`
  font-size: 1.2rem;
  margin: 1.5rem 0.8rem;
  font-weight: bold;
  @media ${devices.md} {
    font-size: 1.3rem;
  }
`;
