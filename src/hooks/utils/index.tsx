export const isInRange = (
  value: number,
  distance: number,
  max = 0,
  min = 0,
) => {
  if (
    value !== max &&
    value < max + distance &&
    value > min - distance
  ) {
    return true;
  }
  return false;
};
