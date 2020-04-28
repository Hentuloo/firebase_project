import { useState, useEffect } from 'react';

interface ImageState {
  image: HTMLImageElement | null;
  status: string;
}
const defaultState = { image: null, status: 'loading' };

export const useImage = (url: string, crossOrigin?: string) => {
  const [{ image, status }, setImage] = useState<ImageState>(
    defaultState,
  );

  useEffect(() => {
    if (!url) return;
    const img = document.createElement('img');

    const onload = () => {
      setImage({ image: img, status: 'loaded' });
    };

    const onerror = () => {
      setImage({ image: null, status: 'failed' });
    };

    img.addEventListener('load', onload);
    img.addEventListener('error', onerror);
    if (crossOrigin) img.crossOrigin = crossOrigin;
    img.src = url;

    const cleanup = () => {
      img.removeEventListener('load', onload);
      img.removeEventListener('error', onerror);
      setImage(defaultState);
    };

    return cleanup;
  }, [url, crossOrigin]);

  return [image, status];
};
