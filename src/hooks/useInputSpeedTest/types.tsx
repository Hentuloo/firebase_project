import { TypingBackspace, TypingNewLetter } from './actions';
import { SetGeneralTextAction } from './useInputSpeedTest';

export enum types {
  INPUT_BACKSPACE,
  INPUT_NEW_LETTER,
  SET_GENERAL_TEXT,
}
export interface InputObserverResponse {
  letter: string;
  inputValue: string;
}
export type Action =
  | TypingBackspace
  | TypingNewLetter
  | SetGeneralTextAction;
