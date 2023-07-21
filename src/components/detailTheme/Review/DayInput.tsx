import React from "react";
import styled from "styled-components";
import TitleText from "./TitleText";

interface DayInputProps {
  title: string;
}

export default function DayInput({ title }: DayInputProps) {
  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset);
  const todayString = today.toISOString().split("T")[0];

  return (
    <Container>
      <TitleText>{title}</TitleText>
      <Input type="date" name="playDate" max={todayString} />
    </Container>
  );
}
const Container = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled.input``;
