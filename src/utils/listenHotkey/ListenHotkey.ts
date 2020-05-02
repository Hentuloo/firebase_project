import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { bufferObserve } from './buffer-observe';
import { areSequencesEqual } from './match';

export const listenHotKey = (
  sequence: string[],
  prevent: string[] = [],
) => {
  const keyDown$ = fromEvent<KeyboardEvent>(document, 'keydown');
  const keyUp$ = fromEvent<KeyboardEvent>(document, 'keyup');

  return keyDown$.pipe(
    map(e => {
      if (prevent.some(preventedKey => e.key === preventedKey))
        e.preventDefault();
      return e;
    }),
    bufferObserve(
      buffer =>
        areSequencesEqual(
          sequence,
          buffer.map(i => i.key),
        ),
      keyUp$,
    ),
  );
};
