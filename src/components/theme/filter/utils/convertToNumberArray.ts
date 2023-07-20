/**
 * @param str 숫자 배열로 변환 할 문자
 * @returns 숫자 배열
 */
export const convertToNumberArray = (str: string) => {
  const numbers = str.split(",").map(Number);
  return numbers;
};
