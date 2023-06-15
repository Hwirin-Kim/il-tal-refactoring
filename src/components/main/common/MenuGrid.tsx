import React from "react";
import styled from "styled-components";
import { devices } from "styles/devices";

interface IMenuGridProps {
  children: React.ReactNode;
}

export default function MenuGrid({ children }: IMenuGridProps) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 2fr 3fr 2fr;
  margin-top: 20px;

  @media ${devices.md} {
    grid-template-columns: 0.5fr 1.5fr 1.5fr 5fr 1.5fr;
  }
`;
