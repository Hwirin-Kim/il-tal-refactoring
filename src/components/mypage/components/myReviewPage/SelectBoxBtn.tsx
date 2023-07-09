import selectIndex2 from "components/mypage/components/myReviewPage/selectIndex";
import React from "react";
import styled from "styled-components";

interface IndexType {
  value: number | string;
  name: string;
}

interface SelectBoxBtnProps {
  name: string;
  defaultValue: number | string;
  onChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  index: IndexType[];
  color?: string;
}
/**
 * 이것은 셀렉트 박스입니다.
 * @param label select box 상단 고정 이름
 * @param name select하는 data의 key값
 * @param defaultValue default로 들어갈 value
 * @param onChangeHandler onChange 이벤트 핸들러
 * @param index option구성에 필요한 배열
 * @returns select box
 */
export default function SelectBoxBtn({
  color,
  name,
  defaultValue,
  index,
  onChangeHandler,
}: SelectBoxBtnProps) {
  return (
    <SelectBox
      name={name}
      required
      onChange={onChangeHandler}
      defaultValue={defaultValue}
      color={color}
    >
      {index.map((item) => {
        return (
          <Option key={item.value} value={item.value}>
            {item.name}
          </Option>
        );
      })}
    </SelectBox>
  );
}

const SelectBox = styled.select<{ color?: string }>`
  background-color: #f3f3f3;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.5rem;
  padding: 0.2rem 0;
  ${(props) => props.color && `color:${props.color}`}
`;

const Option = styled.option`
  color: black;
`;
