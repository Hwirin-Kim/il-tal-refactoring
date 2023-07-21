import React from "react";
import styled from "styled-components";
import StarCount from "./StarCount";
import { difficultyIndex, hintIndex, successIndex } from "./optionindex";
import CategoryComponent from "./CategoryComponent";
import DayInput from "./DayInput";
import CommentInput from "./CommentInput";

export default function NewCommentForm() {
  return (
    <Container>
      <StarCount title="별점" />
      <CategoryComponent title="성공여부" name="success" index={successIndex} />

      <CategoryComponent
        title="난이도"
        name="difficulty"
        index={difficultyIndex}
      />

      <CategoryComponent title="힌트 사용 횟수" name="hint" index={hintIndex} />
      <DayInput title="플레이 날짜" />
      <CommentInput />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;
