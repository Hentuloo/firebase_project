import {
  checkNewInputValue,
  addLetterToLastWord,
  removeLeterFromLastWord,
} from './utils';
import { types, Action } from './types';

export type StateType = {
  inputValue: string;
  wordsInArray: string[];
  letterWasAdded: boolean;
  goodText: string;
  wrongText: string;
  cursor: number;
  text: string;
};

export const reducer = (
  state: StateType,
  action: Action,
): StateType => {
  switch (action.type) {
    case types.SET_GENERAL_TEXT:
      return { ...state, text: action.payload };
    case types.INPUT_NEW_LETTER: {
      const { inputValue, letter: newLetter } = action.payload;
      const [newGoodChar, newWrongChar] = checkNewInputValue(
        state.text,
        inputValue,
        newLetter,
      );
      const wordsInArray = addLetterToLastWord(
        state.wordsInArray,
        newLetter,
      );

      return {
        ...state,
        inputValue,
        wordsInArray,
        letterWasAdded: true,
        wrongText: state.wrongText + newWrongChar,
        goodText: state.goodText + newGoodChar,
      };
    }

    case types.INPUT_BACKSPACE: {
      return {
        ...state,
        wordsInArray: removeLeterFromLastWord(state.wordsInArray),
        letterWasAdded: false,
        inputValue: state.inputValue.slice(0, -1),
        wrongText: state.wrongText.slice(0, -1),
        goodText: state.goodText.slice(0, -1),
      };
    }
    default:
      return state;
  }
};
