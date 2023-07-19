import { timeState } from "api/store";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import CategoryTitle from "./common/CategoryTitle";

const TimeInput = () => {
  const [searchParams, _] = useSearchParams();

  const timeParam = searchParams.get("time")?.split(",") ?? ["", ""];

  const [time, setTime] = useRecoilState(timeState);
  const [firstTime, setFirstTime] = useState<string>(timeParam[0]);
  const [secondTime, setSecondTime] = useState<string>(timeParam[1]);
  const [timeOptions, setTimeOptions] = useState<ArrType[]>([]);

  interface ArrType {
    value: string;
    name: string;
  }

  const newArr = () => {
    let arr: ArrType[] = [{ value: "", name: "선택" }];
    for (let i = 8; i <= 23; i++) {
      arr.push({ value: `${i}`, name: `${i}시` });
    }
    return arr;
  };

  // 초기 설정
  useEffect(() => {
    setTimeOptions(generateOptions(firstTime));
  }, [firstTime]);

  useEffect(() => {
    setTime([firstTime, secondTime]);
  }, [firstTime, secondTime]);

  const generateOptions = (start: number | string) => {
    const options: ArrType[] = [];

    if (start === "") {
      options.push({ value: "", name: "선택" });
      for (let i = 8; i <= 24; i++) {
        options.push({ value: `${i}`, name: `${i}시` });
      }
      return options;
    }
    const numStart = Number(start);
    for (let i = numStart + 1; i <= 24; i++) {
      options.push({ value: `${i}`, name: `${i}시` });
    }
    setSecondTime(options[0].value);
    return options;
  };

  return (
    <Container>
      <CategoryTitle>시간</CategoryTitle>

      <Select value={time[0]} onChange={(e) => setFirstTime(e.target.value)}>
        {newArr().map((time) => {
          return (
            <Option key={time.value} value={time.value}>
              {time.name}
            </Option>
          );
        })}
      </Select>
      <Dash>-</Dash>
      <Select value={time[1]} onChange={(e) => setSecondTime(e.target.value)}>
        {timeOptions.map((time) => {
          return (
            <Option key={time.value} value={time.value}>
              {time.name}
            </Option>
          );
        })}
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
