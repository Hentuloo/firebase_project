import { TypingObserverActions } from './typingObserver';
import { SetGeneralTextAction } from './actions';

export enum types {
  INPUT_BACKSPACE,
  INPUT_NEW_LETTER,
  SET_GENERAL_TEXT,
}

export enum typingStatus {
  BEGINING,
  TYPING,
  END,
}

export type Action = TypingObserverActions | SetGeneralTextAction;
