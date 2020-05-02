import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

import { isMobile } from 'utils';
import { types, Action } from '../types';

export type TypingObserverActions = TypingBackspace | TypingNewLetter;

type letterType = string | boolean | null;

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
  dispatch: React.Dispatch<Action>,
) => {
  const input$ = fromEvent(inputElement, 'input');
  const typing$ = input$.pipe(
    map((e: any) => {
      let letter: letterType = e.data;

      const { currentTarget } = e;
      const { value } = currentTarget;

      // (on mobile) e.data is not a single letter
      if (isMobile()) {
        const prevValue = currentTarget.defaultValue;

        if (prevValue.length > value.length) letter = null;
        else if (prevValue.length === value.length) letter = false;
        else letter = value.slice(-1);
      }

      return { letter, inputValue: value };
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
          return {
            payload: { letter, inputValue },
            type: types.INPUT_NEW_LETTER,
          };
        }

        case false:
          return { type: null };

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
