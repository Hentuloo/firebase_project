export const isInRange = (value, distance, max = 0, min = 0) => {
  if (
    value !== max &&
    value < max + distance &&
    value > min - distance
  ) {
    return true;
  }
  return false;
};
