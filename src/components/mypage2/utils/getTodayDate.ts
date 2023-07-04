/**
 * 오늘 날짜를 2023-01-01 형태로 보여주는 함수
 * input의 max값 입력에 사용
 * @returns 오늘 날짜를 "2023-01-01" 형태의 string으로 반환
 */

export const getTodayDate = () => {
  const today = new Date().toISOString().split("T")[0];
  return today;
};
