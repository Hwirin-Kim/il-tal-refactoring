interface DifficultyListItem {
  value: number | string;
  name: string;
}

export const getDifficultyName = (
  difficultyValue: number,
  difficultyList: DifficultyListItem[]
) => {
  for (let difficulty of difficultyList) {
    if (difficulty.value === difficultyValue) {
      return difficulty.name;
    }
  }

  return "난이도";
};
