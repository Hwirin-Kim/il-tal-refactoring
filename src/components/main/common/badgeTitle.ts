export const badgeTitle = (cnt: number) => {
  let message: string;
  switch (true) {
    case cnt >= 1 && cnt < 4:
      message = "용감한 방린이!";
      break;
    case cnt >= 4 && cnt < 7:
      message = "어느덧 방탈출 중수!";
      break;
    case cnt >= 7 && cnt < 9:
      message = "고수의 품격이 느껴지시네요!";
      break;
    case cnt === 10:
      message = "방탈출 마스터";
      break;

    default:
      message = "리뷰 작성 후 뱃지를 획득해보세요!";
  }
  return message;
};
