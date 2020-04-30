import { StateType } from './reducer';

export const checkNewInputValue = (
  correctText: string,
  inputValue: string,
  newLetter: string,
) => {
  const letterInCorrectText = correctText.charAt(
    inputValue.length - 1,
  );

  const isLetterOk = letterInCorrectText === newLetter;
  const isSpace = letterInCorrectText === ' ';

  if (isLetterOk) return [letterInCorrectText, ' ', false];
  return [' ', isSpace ? '_' : letterInCorrectText, true];
};

export const addLetterToLastWordInArray = (
  array: Array<string>,
  letter: string,
) => {
  if (array.length === 0) return [letter];
  if (letter === ' ') return [...array, ' '];
  return [...array.slice(0, -1), array.slice(-1)[0] + letter];
};

export const removeLeterFromLastWord = (
  array: Array<string>,
): string[] => {
  if (array.length === 0) return [];
  if (array.length === 1) return [array[0].slice(0, -1)];

  if (array.slice(-1)[0] === ' ') return [...array.slice(0, -1)];
  if (array.slice(-1)[0] === '') {
    if (array.length === 2) return [array[0].slice(0, -1)];
    return [
      ...array.slice(0, -2),
      array.slice(-2, -1)[0].slice(0, -1),
    ];
  }
  return [...array.slice(0, -1), array.slice(-1)[0].slice(0, -1)];
};

export const getStatePieceWithNewLetter = (
  state: StateType,
  values: {
    inputValue: string;
    letter: string;
  },
) => {
  const { inputValue, letter: newLetter } = values;
  const [newGoodChar, newWrongChar, isWrong] = checkNewInputValue(
    state.text,
    inputValue,
    newLetter,
  );

  const wordsInArray = addLetterToLastWordInArray(
    state.wordsInArray,
    newLetter,
  );

  return {
    inputValue,
    wordsInArray,
    letterWasAdded: true,
    cursor: inputValue.length,
    wrongText: state.wrongText + newWrongChar,
    goodText: state.goodText + newGoodChar,
    wrongLength: state.wrongLength + (isWrong ? 1 : 0),
    goodLength: state.goodLength + (isWrong ? 0 : 1),
  };
};
