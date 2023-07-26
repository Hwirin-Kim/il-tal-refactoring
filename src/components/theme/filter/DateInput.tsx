import { dayState } from "api/store";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import CategoryTitle from "./common/CategoryTitle";

export default function DateInput() {
  const [day, setDay] = useRecoilState(dayState);
  const [selectedDate, setSelectedDate] = useState("");

  // 오늘날짜, 일주일 후 날짜 구하기
  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset);
  const todayString = today.toISOString().split("T")[0];

  // 일주일 후 날짜 구하기
  const oneWeekLater = new Date();
  const nowDay = new Date(Date.now());

  oneWeekLater.setDate(nowDay.getDate() + 6);
  const oneWeekLaterString = oneWeekLater.toISOString().split("T")[0];

  //전역 상태를 기준으로 오늘 날짜 표기
  useEffect(() => {
    if (day && !isNaN(Number(day))) {
      const selectedDay = Number(day);
      if (selectedDay >= 1 && selectedDay <= 7) {
        const targetDate = new Date(Date.now() - offset);
        targetDate.setDate(today.getDate() + selectedDay - 1);
        setSelectedDate(targetDate.toISOString().split("T")[0]);
      } else {
        setSelectedDate("");
      }
    } else {
      setSelectedDate("");
    }
  }, [day]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const today = new Date();
    const selectDate = new Date(e.target.value);

    const diffTime = Math.abs(selectDate.getDate() - today.getDate()) + 1;
    if (e.target.value !== "") {
      setDay(diffTime.toString());
    } else {
      setDay("");
    }
  };

  return (
    <Container>
      <CategoryTitle>날짜</CategoryTitle>

      <Input
        type="date"
        onChange={onChange}
        min={todayString}
        max={oneWeekLaterString}
        value={selectedDate}
      />
      {/* {selectedDate !== "" && <WarningText>• 시간 입력도 필수</WarningText>} */}
    </Container>
  );
}

const Container = styled.div``;

const Input = styled.input`
  border-radius: 1rem;
  padding: 0.1rem 0.2rem;
  border: 1px solid var(--color-border);
`;
