import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { types, InputObserverResponse } from './types';

export interface TypingBackspace {
  type: types.INPUT_BACKSPACE;
  payload: InputObserverResponse;
}
export interface TypingNewLetter {
  type: types.INPUT_NEW_LETTER;
  payload: InputObserverResponse;
}

export const inputTypingObserver = (Obs: Observable<Event>) =>
  Obs.pipe(
    map((e: any) => {
      e.preventDefault();
      const {
        data,
        target: { value },
      }: { data: string; target: HTMLInputElement } = e;

      return {
        letter: data,
        inputValue: value,
      };
    }),
    map(e => {
      switch (e.letter) {
        case null:
          return { payload: e, type: types.INPUT_BACKSPACE };
        case ' ': {
          if (e.inputValue.slice(-2) === '  ') return { type: null };
          return { payload: e, type: types.INPUT_NEW_LETTER };
        }
        default:
          return { payload: e, type: types.INPUT_NEW_LETTER };
      }
    }),
  );
