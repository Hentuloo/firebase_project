import {
  removeLeterFromLastWord,
  getStatePieceWithNewLetter,
} from './utils';
import { types, Action, typingStatus } from './types';

export type StateType = {
  inputValue: string;
  wordsInArray: string[];
  letterWasAdded: boolean;
  goodText: string;
  wrongText: string;
  cursor: number;
  text: string;
  gameStatus: typingStatus;
};

export const reducer = (
  state: StateType,
  action: Action,
): StateType => {
  switch (action.type) {
    case types.SET_GENERAL_TEXT:
      return { ...state, text: action.payload };

    case types.INPUT_NEW_LETTER: {
      if (state.gameStatus === typingStatus.END) return state;
      const {
        payload,
        payload: { inputValue },
      } = action;

      const isLastLetter = inputValue.length === state.text.length;

      return {
        ...state,
        ...getStatePieceWithNewLetter(state, payload),
        gameStatus: isLastLetter
          ? typingStatus.END
          : typingStatus.TYPING,
      };
    }

    case types.INPUT_BACKSPACE: {
      if (state.gameStatus === typingStatus.END) return state;
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
