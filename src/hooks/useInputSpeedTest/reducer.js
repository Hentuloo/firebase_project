import {
  checkNewInputValue,
  addLetterToLastWord,
  removeLeterFromLastWord,
} from './utils';
import types from './types';

export const reducer = (state, action) => {
  if (action.type === types.SET_GENERAL_TEXT) {
    return { ...state, text: action.payload };
  }
  if (action.type === types.INPUT_NEW_LETTER) {
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

  if (action.type === types.INPUT_BACKSPACE) {
    return {
      ...state,
      wordsInArray: removeLeterFromLastWord(state.wordsInArray),
      letterWasAdded: false,
      inputValue: state.inputValue.slice(0, -1),
      wrongText: state.wrongText.slice(0, -1),
      goodText: state.goodText.slice(0, -1),
    };
  }
  return state;
};
