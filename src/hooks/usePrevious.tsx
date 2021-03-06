import { useRef, useEffect } from 'react';

export const usePrevious = <T extends {}>(value: T) => {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
