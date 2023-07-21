import React from "react";
import styled from "styled-components";
import TitleText from "./TitleText";

export default function CommentInput() {
  const placeholderText = "후기를 공유해보세요! (200자 미만)";
  const maxLength = 200;

  return (
    <Container>
      <TitleText>리뷰</TitleText>
      <Textarea
        placeholder={placeholderText}
        maxLength={maxLength}
        name="comment"
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const Textarea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  resize: none;
`;
