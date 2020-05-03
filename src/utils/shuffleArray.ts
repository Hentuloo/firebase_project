// Durstenfeld shuffle
export const shuffleArray = <T>(array: T[]) => {
  const copyOfArray = [...array];
  for (let i = copyOfArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [copyOfArray[i], copyOfArray[j]] = [
      copyOfArray[j],
      copyOfArray[i],
    ];
  }
  return copyOfArray;
};
