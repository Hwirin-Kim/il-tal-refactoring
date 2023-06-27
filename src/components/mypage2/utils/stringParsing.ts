export const stringParsing = (data: string[]): string[] => {
  let newArr: string[] = [];

  for (let i = 0; i < data.length; i++) {
    let parsedData = data[i].split(" ").filter(Boolean);
    newArr = [...newArr, ...parsedData];
  }

  return newArr;
};
