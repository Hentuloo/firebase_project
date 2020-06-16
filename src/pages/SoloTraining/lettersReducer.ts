import {
  letters as initialLettersObject,
  LetterProperties,
} from 'config/soloTrainingConfig';
import { TypingStatus } from 'hooks/useInputSpeedTest/types';

export enum types {
  TOGGLE_LETTER,
  SET_FETCHED_SETTINGS,
  INCREASE_AVAIABLE_LEVEL,
  CHANGE_TYPING_STATUS,
}

export interface LetterObject extends LetterProperties {
  letter: string;
  blocked: boolean;
}
export type StateType = {
  typingStatus: TypingStatus;
  fetchedSettings: boolean;
  letters: LetterObject[];
  firstBlockedLetterIndex: number;
  lastActiveLetterIndex: number;
};

const initialLetters = Object.keys(initialLettersObject).map(
  (letter): LetterObject => ({
    ...initialLettersObject[letter],
    letter,
  }),
);

export const lettersReducerInit: StateType = {
  typingStatus: TypingStatus.BEGINING,
  fetchedSettings: false,
  letters: initialLetters,
  lastActiveLetterIndex: 6,
  firstBlockedLetterIndex: 10,
};

export default (
  state: StateType = lettersReducerInit,
  action: any,
): StateType => {
  if (action.type === types.TOGGLE_LETTER) {
    if (state.typingStatus === TypingStatus.TYPING) return state;

    const index = action.payload;
    if (index >= state.firstBlockedLetterIndex) return state;
    return { ...state, lastActiveLetterIndex: index };
  }
  if (action.type === types.SET_FETCHED_SETTINGS) {
    const { payload } = action;
    return {
      ...state,
      fetchedSettings: true,
      firstBlockedLetterIndex: payload,
      lastActiveLetterIndex: payload - 1,
    };
  }
  if (action.type === types.INCREASE_AVAIABLE_LEVEL) {
    const { firstBlockedLetterIndex, lastActiveLetterIndex } = state;

    return {
      ...state,
      firstBlockedLetterIndex: firstBlockedLetterIndex + 1,
      lastActiveLetterIndex: lastActiveLetterIndex + 1,
    };
  }
  if (action.type === types.CHANGE_TYPING_STATUS) {
    return {
      ...state,
      typingStatus: action.payload,
    };
  }
  return state;
};
