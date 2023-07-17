import React, { useState } from "react";
import styled from "styled-components";

export default function DateInput() {
  const [day, setDay] = useState(1);

  // 오늘 날짜 구하기
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  // 일주일 후 날짜 구하기
  const oneWeekLater = new Date();
  oneWeekLater.setDate(oneWeekLater.getDate() + 6);
  const oneWeekLaterString = oneWeekLater.toISOString().split("T")[0];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const today = new Date();
    const selectDate = e.target.value;
    const diffTime = Math.abs(selectDate - today);

    console.log(e.target.value);
  };

  // 최소값과 최대값 설정

  //   // input 요소의 value 속성 설정
  //   dateInput.addEventListener("input", function () {
  //     const selectedDate = new Date(dateInput.value);
  //     const today = new Date();

  //     const diffTime = Math.abs(selectedDate - today);
  //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  //     dateInput.value = diffDays;
  //   });
  return (
    <Input
      type="date"
      onChange={onChange}
      min={todayString}
      max={oneWeekLaterString}
    />
  );
}

const Input = styled.input``;
