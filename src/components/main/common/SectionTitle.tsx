import React from "react";
import styled from "styled-components";

interface ISectionTitleProps {
  children: React.ReactNode;
}

export default function SectionTitle({ children }: ISectionTitleProps) {
  return <Text>{children}</Text>;
}

const Text = styled.p`
  font-size: 1.3rem;
  margin: 1.5rem 0.8rem;
`;
