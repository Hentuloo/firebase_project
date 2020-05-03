import { fromEvent } from 'rxjs';
import { bufferObserve } from './buffer-observe';
import { areSequencesEqual } from './match';

export const listenHotKey = (sequence: string[]) => {
  const keyDown$ = fromEvent<KeyboardEvent>(document, 'keydown');
  const keyUp$ = fromEvent<KeyboardEvent>(document, 'keyup');

  return keyDown$.pipe(
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
