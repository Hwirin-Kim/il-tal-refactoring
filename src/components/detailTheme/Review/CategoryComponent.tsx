import React from "react";
import styled from "styled-components";

interface CategoryComponentProps {
  name: string;
  title: string;
  index: { value: string; label: string }[];
}
/**
 *
 * @param title 타이틀에 걸릴 이름
 * @param name input name
 * @param index map 메서드 적용할 배열
 * @returns 카테고리 컴포넌트
 */
export default function CategoryComponent({
  title,
  name,
  index,
}: CategoryComponentProps) {
  return (
    <Container>
      <TitleText>{title}</TitleText>
      {index.map((category) => {
        return (
          <React.Fragment>
            <CategoryInput
              name={name}
              id={name + category.value}
              type="radio"
              value={category.value}
            />
            <CategoryLabel htmlFor={name + category.value}>
              {category.label}
            </CategoryLabel>
          </React.Fragment>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 1.5rem;
`;
const TitleText = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;
const CategoryInput = styled.input`
  display: none;
  &:checked + label {
    color: white;
    background-color: var(--color-main);
    border-color: var(--color-main);
  }
`;

const CategoryLabel = styled.label`
  font-size: 0.8rem;
  box-sizing: border-box;
  border: 1px solid var(--color-border);
  color: grey;
  padding: 0.1rem 0.3rem;
  border-radius: 0.5rem;
  margin-left: 0.5rem;
`;
