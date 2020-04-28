import { useState, useCallback } from 'react';

export const useProgressBar = (divider = 6) => {
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(
    number => {
      for (let i = 1; i <= divider; i += 1) {
        if (number >= 100 / i) {
          setProgress(100 / i);
          break;
        }
      }
    },
    [divider],
  );

  return [progress, updateProgress];
};
