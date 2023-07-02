import React, { ChangeEvent, ReactElement } from "react";
import styled from "styled-components";

interface CategoryItem {
  name: string;
  value: number | string | number[];
}

interface CategoryBtnProps {
  categoryIndex: CategoryItem[];
  state: string[];
  fontSize: string;
  setState: React.Dispatch<React.SetStateAction<string[]>>;
}

//카테고리 필터용 버튼 컴포넌트 (인덱스로 각 항목별 인덱스 넣고, props로 state와 setState를 각각 보내서 사용)
const CategoryBtn = ({
  categoryIndex,
  state,
  setState,
  fontSize,
}: CategoryBtnProps) => {
  const categoryHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    //해당 State에 클릭한 카테고리가 있는지 확인한다. (있다면 클릭한 카테고리를 반환하고, 없다면 undefined가 됨)
    const isInclude = state.find(
      (element) => element === e.currentTarget.value
    );

    //만약 클릭한 카테고리가 "전체" 인 경우 state는 빈배열로 바꾼다.
    if (e.currentTarget.name === "전체") {
      setState([]);

      //만약 isInclude가 값이 있다면 (클릭해제를 하려는것과 같은 의미), state에서 클릭한 카테고리만 제외시킴
    } else if (isInclude) {
      setState(state.filter((element) => element !== e.currentTarget.value));

      // state에 "전체"가 있다면 "전체"를 state에서 빼내고 나머지 클릭한 값들을 넣어줌
    } else {
      setState([
        ...state.filter((element) => element !== ""),
        e.currentTarget.value,
      ]);
    }
  };

  return (
    <>
      {categoryIndex.map((element) => (
        <Btn
          fontSize={fontSize}
          name={element.name}
          key={`${element.name}${element.value}`}
          type="button"
          onClick={categoryHandler}
          value={element.value}
          backgroundColor={state.find((el) => el === `${element.value}`)}
        >
          {element.name}
        </Btn>
      ))}
    </>
  );
};
export default CategoryBtn;
interface BtnProps {
  name: string;
  type: string;
  onClick: Function;
  value: any;
  backgroundColor: string | undefined;
  fontSize: string;
}
const Btn = styled.button<BtnProps>`
  min-width: 70px;
  height: 35px;
  margin: 3px;
  font-size: ${(props) => `${props.fontSize}px`};
  color: ${({ backgroundColor }) => (backgroundColor ? "white" : "black")};
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? "var(--color-main)" : "#fff"};
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  padding: 0 10px;

  &:hover {
    /* /* color: #333; */
    color: ${({ backgroundColor }) => (backgroundColor ? "white" : "black")};
    background-color: ${({ backgroundColor }) =>
      backgroundColor ? "var(--color-main)" : "#e6e6e6"};
    border-color: grey;
  }
`;
