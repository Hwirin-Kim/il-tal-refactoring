/**
 *
 * @param number 숫자입력
 * @return 콤마가 찍힌 3자리 문자형 숫자
 *
 */

export const addComma = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
