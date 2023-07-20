interface ArrType {
  value: string;
  name: string;
}

/**
 * 사용자가 첫 번째 시간 select로 시간을 입력하면 두 번째 시간은 첫 번째 시간 이후로 목록 재구성
 * 만약 첫 번째 시간을 입력하지 않았다면, 시작시간부터 끝시간까지 생성
 * @param firstSelectTime 첫 번째 select로 받은 시간
 * @param startTime 첫 번째 select가 없을 때 입력할 시간
 * @param endTime 첫 번째 select가 없을 때 입력할 마지막 시간 -1
 * @returns 두 번째 select의 option 배열
 */
export const secondTimeOptionGenerator = (
  firstSelectTime: string,
  startTime: number,
  endTime: number
) => {
  const options: ArrType[] = [{ value: "", name: "선택" }];
  const numStart = Number(firstSelectTime);
  if (firstSelectTime === "") {
    for (let i = startTime; i <= endTime + 1; i++) {
      options.push({ value: `${i}`, name: `${i}시` });
    }
    return options;
  }

  for (let i = numStart + 1; i <= endTime + 1; i++) {
    options.push({ value: `${i}`, name: `${i}시` });
  }

  return options;
};
