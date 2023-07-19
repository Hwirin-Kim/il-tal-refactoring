import React from "react";
import styled from "styled-components";

interface CategoryTitleProps {
  children: React.ReactNode;
}

export default function CategoryTitle({ children }: CategoryTitleProps) {
  return <Text>{children}</Text>;
}

const Text = styled.p`
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
`;
