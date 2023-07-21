import React from "react";
import styled from "styled-components";

interface TitleTextProps {
  children: React.ReactNode;
}

export default function TitleText({ children }: TitleTextProps) {
  return <Text>{children}</Text>;
}

const Text = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;
