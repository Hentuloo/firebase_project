export const validImageFile = ({
  size,
  type,
}: {
  size: Number;
  type: string;
}) => {
  if (size < 100000 || size > 1000000) {
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

export const chunkArray = (array: Array<any>, chunkCount: number) => {
  const copyOfArray = [...array];
  const chunks = [];
  while (copyOfArray.length) {
    chunks.push(copyOfArray.splice(0, chunkCount));
  }
  return chunks;
};
