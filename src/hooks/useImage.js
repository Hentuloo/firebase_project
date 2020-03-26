import { useState, useEffect } from 'react';

const defaultState = { image: undefined, status: 'loading' };

export const useImage = (url, crossOrigin) => {
  const [{ image, status }, setImage] = useState(defaultState);

  useEffect(() => {
    if (!url) return;
    const img = document.createElement('img');

    const onload = () => {
      setImage({ image: img, status: 'loaded' });
    };

    const onerror = () => {
      setImage({ image: undefined, status: 'failed' });
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
