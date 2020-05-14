import { shuffleArray } from 'utils';
import { StateType } from './reducer';
import { InputObserverResponse } from './observables/typingObserver';

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

export const addWrittenLetter = (
  lengthsOfSourceText: number[],
  writtenWords: string[],
  newLetter: string,
) => {
  if (writtenWords.length === 0) return [newLetter];
  const wordId = writtenWords.length - 1;
  const lastWrittenWord = writtenWords.slice(-1)[0];

  // source letter + space
  if (lengthsOfSourceText[wordId] + 1 > lastWrittenWord.length) {
    return [
      ...writtenWords.slice(0, -1),
      lastWrittenWord + newLetter,
    ];
  }
  // create new written item
  return [...writtenWords, newLetter];
};

export const removeLeterFromLastWord = (
  words: Array<string>,
): string[] => {
  const { length } = words;
  if (length === 0) return [];
  if (length === 1) return [words[0].slice(0, -1)];

  if (words.slice(-1)[0] === ' ') return [...words.slice(0, -1)];
  if (words.slice(-1)[0] === '') {
    if (length === 2) return [words[0].slice(0, -1)];
    return [
      ...words.slice(0, -2),
      words.slice(-2, -1)[0].slice(0, -1),
    ];
  }
  return [...words.slice(0, -1), words.slice(-1)[0].slice(0, -1)];
};

export const getStatePieceWithNewLetter = (
  state: StateType,
  values: InputObserverResponse,
) => {
  const { inputValue, letter: newLetter } = values;
  const [newGoodChar, newWrongChar, isWrong] = checkNewInputValue(
    state.sourceText,
    inputValue,
    newLetter,
  );

  const writtenWords = addWrittenLetter(
    state.lengthsOfSourceText,
    state.writtenWords,
    newLetter,
  );

  return {
    inputValue,
    writtenWords,
    letterWasAddedFlag: true,
    cursor: inputValue.length,
    wrongText: state.wrongText + newWrongChar,
    goodText: state.goodText + newGoodChar,
    wrongLength: state.wrongLength + (isWrong ? 1 : 0),
    goodLength: state.goodLength + (isWrong ? 0 : 1),
  };
};

export const generateRandomWords = (assets?: string[]) => {
  const randomWords = shuffleArray<string>(assets || []).slice(0, 6);
  const sourceText = randomWords.join(' ');
  const lengths = randomWords.map(word => word.length);

  return {
    randomWords,
    sourceText,
    lengths,
  };
};
