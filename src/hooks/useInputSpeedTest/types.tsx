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
  CHANGE_TEXT_ASSETS = 'CHANGE_TEXT_ASSETS',
  NEW_MULTIPLAYER_GAME = 'NEW_MULTIPLAYER_GAME',
  START_SCHEUDLE_GAME = 'START_SCHEUDLE_GAME',
}

export enum TypingMood {
  TIME = 'TIME',
  TEXT = 'TEXT',
  MULTIPLAYER = 'MULTIPLAYER',
}

export enum TypingStatus {
  BEGINING = 'BEGINING',
  BEFORE_SCHEDULED_GAME = 'BEFORE_SCHEDULED_GAME',
  TYPING = 'TYPING',
  END = 'END',
}

export type Action =
  | TypingObserverActions
  | ActionCreatorsBasicTypse
  | TimeObserverAction;
