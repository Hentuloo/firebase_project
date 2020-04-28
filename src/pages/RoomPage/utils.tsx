export const getCopyStatusMessage = (status: boolean | null) => {
  if (status !== null) {
    return status ? 'skopiowane' : 'nieskopiowane';
  }
  return null;
};
