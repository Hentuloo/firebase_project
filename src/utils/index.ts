export * from './listenHotkey/ListenHotkey';
export * from './shuffleArray';

export const isMobile = () =>
  typeof window.orientation !== 'undefined';

export const validImageFile = ({
  size,
  type,
}: {
  size: number;
  type: string;
}) => {
  if (size < 600 || size > 1000000) {
    return { ok: false, message: 'Invalid size' };
  }
  if (
    type !== 'image/png' &&
    type !== 'image/jpg' &&
    type !== 'image/jpeg'
  ) {
    return { ok: false, message: 'Invalid file type (png or jpg)' };
  }
  return { ok: true };
};

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
