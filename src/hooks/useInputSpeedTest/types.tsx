import { TypingObserverActions } from './observables/typingObserver';
import { TimeObserverAction } from './observables/timeObserver';
import { ActionCreatorsBasicTypse } from './actions';

export enum types {
  INPUT_BACKSPACE = 'INPUT_BACKSPACE',
  INPUT_NEW_LETTER = 'INPUT_NEW_LETTER',
  SET_GENERAL_TEXT = 'SET_GENERAL_TEXT',
  SET_TIME_STEPS = 'SET_TIME_STEPS',
  SUBTRACT_TIME_STEPS = 'SUBTRACT_TIME_STEPS',
  SET_INITIAL_TIME = 'SET_INITIAL_TIME',
  RESET_GAME = 'RESET_GAME',
  GENERATE_WORDS = 'GENERATE_WORDS',
  UPDATE_SOURCE_TEXT = 'UPDATE_SOURCE_TEXT',
  TAKE_GAME_SNAP = 'TAKE_GAME_SNAP',
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
