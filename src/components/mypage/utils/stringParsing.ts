// export const stringParsing = (
//   arr1: string | null,
//   arr2: string | null
// ): string[] | string => {
//   if (arr1 === null || arr2 === null) {
//     return "성향 수정버튼을 눌러 선호하는 장르나 스타일을 골라주세요";
//   }

//   let newArr: string[] = [];

//   if (arr1 !== null) {
//     console.log(arr1);
//     let parsedData = arr1.split(" ").filter(Boolean);
//     newArr = [...newArr, ...parsedData];
//   }
//   if (arr2 !== null) {
//     let parsedData = arr2.split(" ").filter(Boolean);
//     newArr = [...newArr, ...parsedData];
//   }

//   return newArr;
// };

export const stringParsing = (str: string | null) => {
  if (str === null) {
    return [];
  }
  let newArr: string[] = [];
  let parsedData = str.split(" ").filter(Boolean);
  newArr = [...newArr, ...parsedData];
  return newArr;
};
