export const getCopyStatusMessage = status => {
  if (status !== null) {
    return status ? 'skopiowane' : 'nieskopiowane';
  }
  return null;
};
