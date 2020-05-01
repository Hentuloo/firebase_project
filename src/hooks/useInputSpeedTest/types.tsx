import { TypingObserverActions } from './typingObserver';
import { TimeObserverAction } from './timeObserver';
import { ActionCreatorsBasicTypse } from './actions';

export enum types {
  INPUT_BACKSPACE,
  INPUT_NEW_LETTER,
  SET_GENERAL_TEXT,
  SET_TIME_STEPS,
  SUBTRACT_TIME_STEPS,
  SET_INITIAL_TIME,
}

export enum typingMood {
  TIME,
  TEXT,
}

export enum typingStatus {
  BEGINING,
  TYPING,
  END,
}

export type Action =
  | TypingObserverActions
  | ActionCreatorsBasicTypse
  | TimeObserverAction;
