import React from "react";
import styled from "styled-components";
import TitleText from "./TitleText";
import { onChangeHandler } from "./NewCommentForm";

interface DayInputProps {
  title: string;
  onChangeHandler: onChangeHandler;
  value: string;
}

export default function DayInput({
  title,
  onChangeHandler,
  value,
}: DayInputProps) {
  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset);
  const todayString = today.toISOString().split("T")[0];

  return (
    <Container>
      <TitleText>{title}</TitleText>
      <Input
        onChange={onChangeHandler}
        type="date"
        name="playDate"
        max={todayString}
        value={value}
      />
    </Container>
  );
}
const Container = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background-color: white;
`;
