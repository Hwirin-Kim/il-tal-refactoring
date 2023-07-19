import React, { useEffect } from "react";
import styled from "styled-components";
import { SetterOrUpdater } from "recoil";

interface CategoryType {
  name: string;
  value: string;
}

interface CategoryFilterProps {
  category: CategoryType[];
  state: string[];
  setState: SetterOrUpdater<string[]>;
}

function CategoryFilter({ category, state, setState }: CategoryFilterProps) {
  useEffect(() => {
    if (state.length === 0) {
      setState(["전체"]);
    }
  }, [state]);

  const handleButtonClick = (category: string) => {
    if (category === "전체") {
      setState(["전체"]);
    } else if (state.includes(category)) {
      setState(state.filter((c) => c !== category));
    } else {
      setState([...state.filter((c) => c !== "전체"), category]);
    }
  };

  return (
    <Container>
      {category.map((parameter, index) => (
        <CategoryBtn
          key={index}
          isSelected={state.includes(parameter.value)}
          onClick={() => handleButtonClick(parameter.value)}
        >
          {parameter.name}
        </CategoryBtn>
      ))}
    </Container>
  );
}

export default CategoryFilter;

const Container = styled.div``;

const CategoryBtn = styled.button<{ isSelected: boolean }>`
  min-width: 4.5rem;
  height: 1.5rem;
  margin: 0.2rem;
  outline: none;
  border-radius: 0.5rem;
  padding: 0 0.5rem;
  border: 1px solid #e5e5e5;
  background-color: ${(props) =>
    props.isSelected ? "var(--color-main)" : "white"};
  color: ${(props) => (props.isSelected ? "white" : "black")};
  &:hover {
    background-color: ${(props) => !props.isSelected && "#e6e6e6"};
    border-color: grey;
  }
`;
