export function areSequencesEqual<T>(
  master: T[],
  other: T[],
  compare = (a: T, b: T) => a === b,
) {
  return master.every((key, i) => {
    return other[i] ? compare(key, other[i]) : false;
  });
}
