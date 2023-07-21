import React from "react";
import styled from "styled-components";
import StarCount from "./StarCount";
import { difficultyIndex, hintIndex, successIndex } from "./optionindex";
import CategoryComponent from "./CategoryComponent";

export default function NewCommentForm() {
  return (
    <Container>
      <TitleText>별점</TitleText>
      <StarCount />
      <CategoryComponent title="성공여부" name="success" index={successIndex} />

      <CategoryComponent
        title="난이도"
        name="difficulty"
        index={difficultyIndex}
      />

      <CategoryComponent title="힌트 사용 횟수" name="hint" index={hintIndex} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const TitleText = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const CategoryWrapper = styled.div``;

const CategoryInput = styled.input`
  display: none;
  &:checked + label {
    color: black;
  }
`;

const CategoryLabel = styled.label`
  color: grey;
`;
