import { useEffect, useRef } from 'react';

export const useDetectOutElementClick = (active, callback) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !active) return;

    const checkClick = e =>
      !ref.current.contains(e.target) && callback();

    document.addEventListener('click', checkClick);

    return () => {
      document.removeEventListener('click', checkClick);
    };
  }, [active]);

  return ref;
};
