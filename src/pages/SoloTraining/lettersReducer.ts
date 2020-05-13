import {
  letters as initialLettersObject,
  LetterProperties,
} from 'config/soloTrainingConfig';

export enum types {
  TOGGLE_LETTER,
  SET_FETCHED_SETTINGS,
}

export interface LetterObject extends LetterProperties {
  letter: string;
  blocked: boolean;
}
export type StateType = {
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
  return state;
};
