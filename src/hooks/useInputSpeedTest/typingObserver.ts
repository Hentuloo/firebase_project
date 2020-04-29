import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

import { types, Action } from './types';

export type TypingObserverActions = TypingBackspace | TypingNewLetter;

export interface InputObserverResponse {
  letter: string;
  inputValue: string;
}

interface TypingBackspace {
  type: types.INPUT_BACKSPACE;
  payload: InputObserverResponse;
}
interface TypingNewLetter {
  type: types.INPUT_NEW_LETTER;
  payload: InputObserverResponse;
}

export const typingObserver = (
  inputElement: HTMLInputElement,
  text: string,
  dispatch: React.Dispatch<Action>,
) => {
  const input$ = fromEvent(inputElement, 'input');
  const typing$ = input$.pipe(
    map((e: any) => {
      e.preventDefault();
      const {
        data: letter,
        target: { value: inputValue },
      }: { data: string; target: HTMLInputElement } = e;

      return { letter, inputValue };
    }),
  );

  const typingWithActionsCreator$ = typing$.pipe(
    map(({ letter, inputValue }) => {
      switch (letter) {
        case null:
          return {
            payload: { letter, inputValue },
            type: types.INPUT_BACKSPACE,
          };
        case ' ': {
          if (inputValue.slice(-2) === '  ') return { type: null };
          return {
            payload: { letter, inputValue },
            type: types.INPUT_NEW_LETTER,
          };
        }
        default: {
          return {
            payload: { letter, inputValue },
            type: types.INPUT_NEW_LETTER,
          };
        }
      }
    }),
  );

  const sub = typingWithActionsCreator$.subscribe(e => {
    dispatch(e as Action);
  });

  return sub;
};
