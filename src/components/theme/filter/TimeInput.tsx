import { dayState, timeState } from "api/store";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import CategoryTitle from "./common/CategoryTitle";
import { firstTimeOptionGenerator } from "./utils/firstTimeOptionGenerator";
import { secondTimeOptionGenerator } from "./utils/secondTimeOptionGenerator";

const TimeInput = () => {
  const [searchParams, _] = useSearchParams();
  const timeParam = searchParams.get("time")?.split(",") ?? ["", ""];
  const dayStates = useRecoilValue(dayState);

  const [time, setTime] = useRecoilState(timeState);

  const [firstTime, setFirstTime] = useState<string>(timeParam[0]);
  const [secondTime, setSecondTime] = useState<string>(timeParam[1]);
  const [secondTimeOptions, setSecondTimeOptions] = useState<ArrType[]>([]);

  const START_TIME = 8;
  const END_TIME = 23;

  interface ArrType {
    value: string;
    name: string;
  }

  useEffect(() => {
    setSecondTimeOptions(
      secondTimeOptionGenerator(firstTime, START_TIME, END_TIME)
    );
  }, [firstTime]);

  useEffect(() => {
    setTime([firstTime, secondTime]);
  }, [firstTime, secondTime]);

  return (
    <Container>
      <CategoryTitle>시간</CategoryTitle>
      <Wrapper>
        <SelectWrapper>
          <Select
            value={time[0]}
            onChange={(e) => setFirstTime(e.target.value)}
          >
            {firstTimeOptionGenerator(START_TIME, END_TIME).map((time) => {
              return (
                <Option key={time.value} value={time.value}>
                  {time.name}
                </Option>
              );
            })}
          </Select>
          <Dash>-</Dash>
          <Select
            value={secondTime}
            onChange={(e) => setSecondTime(e.target.value)}
          >
            {secondTimeOptions.map((time) => {
              return (
                <Option key={time.value} value={time.value}>
                  {time.name}
                </Option>
              );
            })}
          </Select>
        </SelectWrapper>
        {dayStates !== "" && (firstTime === "" || secondTime === "") && (
          <WarningText>• 시간 입력도 필수</WarningText>
        )}
      </Wrapper>
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

const SelectWrapper = styled.div``;

const WarningText = styled.p`
  color: red;
  font-size: 0.9rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
