import { LetterProperties } from 'config/soloTrainingConfig';

export enum types {
  TOGGLE_LETTER,
}

export interface LetterObject extends LetterProperties {
  letter: string;
  blocked: boolean;
}
export type StateType = {
  letters: LetterObject[];
  lastActiveLetterIndex: number;
};

export default (state: StateType, action: any): StateType => {
  if (action.type === types.TOGGLE_LETTER) {
    const index = action.payload;
    if (!state.letters[index].blocked) return state;
    return { ...state, lastActiveLetterIndex: index };
  }
  return state;
};
