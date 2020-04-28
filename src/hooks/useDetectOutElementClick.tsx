import { useEffect, useRef } from 'react';

export const useDetectOutElementClick = <T extends HTMLElement>(
  active: boolean,
  callback: () => any,
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;

    const checkClick = ({ target }: any) =>
      !el.contains(target) && callback();

    document.addEventListener('click', checkClick);

    return () => {
      document.removeEventListener('click', checkClick);
    };
  }, [active, callback]);

  return ref;
};
