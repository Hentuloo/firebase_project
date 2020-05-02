import { OperatorFunction, Observable, empty } from 'rxjs';

export class Buffer<T> {
  values: T[] = [];

  append(value: T) {
    this.values = [...this.values, value];
  }

  reset() {
    this.values = [];
  }
}

export function bufferObserve<T>(
  filter: (buffer: T[]) => boolean,
  resetNotifier: Observable<any> = empty(),
): OperatorFunction<T, T[]> {
  return (source$: Observable<T>): Observable<T[]> => {
    // eslint-disable-next-line no-buffer-constructor
    const buffer = new Buffer<T>();

    return new Observable(observer => {
      const resetNotifierSubscription = resetNotifier.subscribe(() =>
        buffer.reset(),
      );
      source$.subscribe({
        next: (value: T) => {
          buffer.append(value);
          if (filter(buffer.values)) {
            observer.next(buffer.values);
            buffer.reset();
          }
        },
        error: () => resetNotifierSubscription.unsubscribe(),
        complete: () => resetNotifierSubscription.unsubscribe(),
      });
    });
  };
}
