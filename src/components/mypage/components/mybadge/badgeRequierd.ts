export const badgeRequired = (success: number, fail: number) => {
  let message: string;
  switch (true) {
    case success === 1 && fail === 0:
      message = "성공 1회";
      break;
    case success === 3 && fail === 0:
      message = "성공 3회";
      break;
    case success === 7 && fail === 0:
      message = "성공 7회";
      break;
    case success === 20 && fail === 0:
      message = "성공 20회";
      break;
    case success === 0 && fail === 1:
      message = "실패 1회";
      break;
    case success === 0 && fail === 7:
      message = "실패 7회";
      break;
    case success === 0 && fail === 10:
      message = "실패 10회";
      break;
    case success === 0 && fail === 30:
      message = "성공 30회";
      break;
    case success === 0 && fail === 0:
      message = "총 도전 50회";
      break;
    case success === 50 && fail === 0:
      message = "성공 50회";
      break;
    default:
      message = "";
  }
  return message;
};
