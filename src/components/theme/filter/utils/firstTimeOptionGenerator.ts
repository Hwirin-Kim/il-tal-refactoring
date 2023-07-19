interface ArrType {
  value: string;
  name: string;
}

/**
 * 코드가 실행되면 첫 번째 시간 select의 목록을 구성하는데 이용
 * @param startTime select option 에서 시작 시간
 * @param endTime select option 에서 마지막 시간
 * @returns 첫 번째 시간 select의 option 배열
 */

export const firstTimeOptionGenerator = (
  startTime: number,
  endTime: number
) => {
  let options: ArrType[] = [{ value: "", name: "선택" }];
  for (let i = startTime; i <= endTime; i++) {
    options.push({ value: `${i}`, name: `${i}시` });
  }
  return options;
};
