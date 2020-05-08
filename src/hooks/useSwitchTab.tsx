import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { usePrevious } from './usePrevious';

export type UseSwitchTabResponse<T, E> = [
  (ref: E | null, tabName: T) => void,
  React.Dispatch<React.SetStateAction<T>>,
  T,
];

export const useSwitchTab = <
  T extends string | number,
  E extends HTMLElement
>(
  defaultActive: T,
): UseSwitchTabResponse<T, E> => {
  const [activeTab, setActiveTab] = useState<T>(defaultActive);
  const previousTab = usePrevious(activeTab);
  const tabs = useRef<{ [key in T]?: E | null }>({});

  const setTabRef = (ref: E | null, tabName: T): void => {
    tabs.current[tabName] = ref;
  };

  useEffect(() => {
    const keys = Object.keys(tabs.current);
    keys.forEach(e => {
      if (e === String(activeTab)) return;
      gsap.to(tabs.current[e], { x: -30, opacity: 0, zIndex: -1 });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { [activeTab]: el, [previousTab]: prevEl } = tabs.current;

    if (!el || prevEl === el) return;
    gsap.to(el as HTMLElement, {
      duration: 0.7,
      x: 0,
      opacity: 1,
      zIndex: 1,
    });

    if (!prevEl) return;
    const tl = gsap.timeline();
    tl.to(prevEl as HTMLElement, {
      duration: 0.3,
      x: 50,
      opacity: 0,
    }).set(prevEl as HTMLElement, { x: -100, zIndex: -1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return [setTabRef, setActiveTab, activeTab];
};
