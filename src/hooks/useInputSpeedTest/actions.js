import { map } from 'rxjs/operators';
import types from './types';

export const inputTypingObserver = Obs =>
  Obs.pipe(
    map(e => {
      e.preventDefault();
      return {
        letter: e.data,
        inputValue: e.target.value,
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
