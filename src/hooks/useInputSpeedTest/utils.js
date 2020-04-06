export const checkNewInputValue = (
  correctText,
  inputValue,
  newLetter,
) => {
  const letterInCorrectText = correctText.charAt(
    inputValue.length - 1,
  );

  const isLetterOk = letterInCorrectText === newLetter;
  const isSpace = letterInCorrectText === ' ';

  if (isLetterOk) return [letterInCorrectText, ' '];
  return [' ', isSpace ? '_' : letterInCorrectText];
};

export const addLetterToLastWord = (array, letter) => {
  if (array.length === 0) return [letter];
  if (letter === ' ') return [...array, ' '];
  return [...array.slice(0, -1), array.slice(-1)[0] + letter];
};

export const removeLeterFromLastWord = array => {
  if (array.length === 0) return [];
  if (array.length === 1) return [array[0].slice(0, -1)];

  if (array.slice(-1)[0] === ' ') return [...array.slice(0, -1)];
  if (array.slice(-1)[0] === '') {
    if (array.length === 2) return [array[0].slice(0, -1)];
    return [...array.slice(0, -2), array.slice(-2, -1).slice(0, -1)];
  }
  return [...array.slice(0, -1), array.slice(-1)[0].slice(0, -1)];
};
