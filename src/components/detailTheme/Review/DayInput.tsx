import React from "react";
import styled from "styled-components";
import TitleText from "./TitleText";
import { onChangeHandler } from "./NewCommentForm";

interface DayInputProps {
  title: string;
  onChangeHandler: onChangeHandler;
}

export default function DayInput({ title, onChangeHandler }: DayInputProps) {
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
      />
    </Container>
  );
}
const Container = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled.input``;
