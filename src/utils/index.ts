export * from './listenHotkey/ListenHotkey';
export * from './shuffleArray';

export const isMobile = () =>
  typeof window.orientation !== 'undefined';

export const copyToClipBoard = (message: string) =>
  navigator.clipboard.writeText(message);

export const chunkArray = <T>(array: T[], chunkCount: number) => {
  const copyOfArray = [...array];
  const chunks = [];

  while (copyOfArray.length) {
    chunks.push(copyOfArray.splice(0, chunkCount));
  }

  return chunks;
};

export const checkIfNumberIsInComprtment = (
  value: any,
  min: number,
  max: number,
) =>
  value !== '' &&
  value !== '-' &&
  (min === undefined || value >= min) &&
  (max === undefined || value <= max);

export const getNumbersFromCompartment = (
  min: number,
  max: number,
  insertBefore: number[] = [],
  insertAfter: number[] = [],
) => {
  const numArray = [...insertBefore];
  for (let i = min; i <= max; i += 1) {
    numArray.push(i);
  }
  return numArray.concat(insertAfter);
};

export const secondMaxInArray = (arr: number[]) => {
  const copyOfArray = arr;
  const max = Math.max.apply(null, copyOfArray); // get the max of the array
  const maxi = arr.indexOf(max);
  copyOfArray[maxi] = -Infinity; // replace max in the array with -infinity
  const secondMax = Math.max.apply(null, copyOfArray); // get the new max
  copyOfArray[maxi] = max;
  return secondMax;
};

export const sortByPointsDifference = (points: number[]) => {
  const max = Math.max.apply(null, points);
  const secondMax = secondMaxInArray(points);
  return points.map(num => {
    if (num === max) return max - secondMax;
    if (num === secondMax) return -(max - secondMax);
    return num - max;
  });
};

export const arrayMoveElement = <T = any>(
  array: T[],
  from: number,
  to: number,
): T[] => {
  const copyOfArray = [...array];
  copyOfArray.splice(to, 0, copyOfArray.splice(from, 1)[0]);
  return copyOfArray;
};
