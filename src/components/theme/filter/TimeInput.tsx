import { timeState } from "api/store";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import CategoryTitle from "./common/CategoryTitle";

const TimeInput = () => {
  const [time, setTime] = useRecoilState(timeState);
  const [firstTime, setFirstTime] = useState(8);
  const [secondTime, setSecondTime] = useState(24);
  const [timeOptions, setTimeOptions] = useState<number[]>([]);
  interface ArrType {
    value: string | number;
    name: string;
  }

  const newArr = () => {
    let arr: ArrType[] = [{ value: "", name: "선택" }];
    for (let i = 8; i <= 24; i++) {
      arr.push({ value: i, name: `${i}시` });
    }
    return arr;
  };

  console.log(newArr());

  // 초기 설정
  useEffect(() => {
    setTimeOptions(generateOptions(firstTime));
  }, [firstTime]);

  useEffect(() => {
    setTime([firstTime, secondTime]);
  }, [firstTime, secondTime]);

  // 시간 옵션 생성
  // const generateOptions = (start: number) => {
  //   const options: number[] = [];
  //   for (let i = start + 1; i <= 24; i++) {
  //     options.push(i);
  //   }
  //   return options;
  // };
  const generateOptions = (start: number) => {
    const options: ArrType[] = [{ value: "", name: "선택" }];
    for (let i = start + 1; i <= 24; i++) {
      options.push({ value: i, name: `${i}시` });
    }
    return options;
  };

  return (
    <Container>
      <CategoryTitle>시간</CategoryTitle>
      <Select value={time[0]} onChange={(e) => setFirstTime(+e.target.value)}>
        {Array.from({ length: 16 }, (_, i) => (
          <Option key={i + 8} value={i + 8}>
            {i + 8}시
          </Option>
        ))}
      </Select>
      <Dash>-</Dash>
      <Select value={time[1]} onChange={(e) => setSecondTime(+e.target.value)}>
        {timeOptions.map((time) => (
          <Option key={time} value={time}>
            {time}시
          </Option>
        ))}
      </Select>
    </Container>
  );
};

export default TimeInput;

const Container = styled.div``;

const Select = styled.select`
  box-sizing: border-box;
  border-radius: 1rem;
  font-size: 0.8rem;
  padding: 0.1rem 0.2rem;
  border: 1px solid var(--color-border);
`;

const Option = styled.option``;

const Dash = styled.span`
  margin: 0 0.5rem;
`;
