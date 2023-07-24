import React from "react";
import styled from "styled-components";
import TitleText from "./TitleText";
import { onChangeHandler } from "./CommentForm";

interface CommentInputProps {
  onChangeHandler: onChangeHandler;
  value: string;
}

export default function CommentInput({
  onChangeHandler,
  value,
}: CommentInputProps) {
  const placeholderText = "후기를 공유해보세요! (200자 미만)";
  const maxLength = 200;

  return (
    <Container>
      <TitleText>리뷰</TitleText>
      <Textarea
        onChange={onChangeHandler}
        placeholder={placeholderText}
        maxLength={maxLength}
        name="comment"
        value={value}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

const Textarea = styled.textarea`
  box-sizing: border-box;
  padding: 0.3rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  width: 100%;
  min-height: 11rem;
  resize: none;
`;
