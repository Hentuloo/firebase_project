export const isInRange = (
  value: number,
  distance: number,
  max = 0,
  min = 0,
) => {
  const valuePerDistance = Math.ceil(value / distance);
  const maxPerDistance = Math.ceil(max / distance);

  if (
    value !== max &&
    maxPerDistance >= valuePerDistance + 1 &&
    min <= value
  ) {
    return true;
  }
  return false;
};
