export const stringParsing = (str: string | null) => {
  if (str === null) {
    return [];
  }
  let newArr: string[] = [];
  let parsedData = str.split(" ").filter(Boolean);
  newArr = [...newArr, ...parsedData];
  return newArr;
};
