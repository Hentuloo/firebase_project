import { useEffect, useRef } from 'react';
import { usePagination } from 'hooks/usePagination';
import {
  setInvisibleElementsInParentHeight,
  triggerNewOrder,
} from './utils/collapseAnimation';

type UseCollapseAnimationResponse<T extends HTMLElement> = [
  React.RefObject<T>,
  (e?: any) => any,
  (e?: any) => any,
  { from: number; prev: number | null },
];

export const useCollapseAnimation = <T extends HTMLElement>(
  paginationSettings: any,
): UseCollapseAnimationResponse<T> => {
  const { from, prev, nextStep, prevStep } = usePagination(
    paginationSettings,
  );
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const elements = [...el.children];
    if (!elements.length) return;

    setInvisibleElementsInParentHeight(
      elements,
      paginationSettings.activeCount,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const elements = [...el.children];
    if (!elements.length || prev === null) return;

    triggerNewOrder({
      elements,
      chunkNumber: paginationSettings.activeCount,
      startMark: from,
      prevStartMark: prev,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from]);

  return [ref, nextStep, prevStep, { from, prev }];
};
