import { useEffect, useRef, useState } from 'react';
import {
  usePagination,
  UsePaginationProps,
} from 'hooks/usePagination';
import {
  setInvisibleElementsInParentHeight,
  triggerNewOrder,
  collapseNewElements,
} from './utils/collapseAnimation';
import { usePrevious } from './usePrevious';

type UseCollapseAnimationResponse<T extends HTMLElement> = [
  React.RefObject<T>,
  (e?: any) => any,
  (e?: any) => any,
  { from: number; prev: number | null },
];

export const useCollapseAnimation = <T extends HTMLElement>(
  paginationSettings: UsePaginationProps,
): UseCollapseAnimationResponse<T> => {
  const { from, prev, nextStep, prevStep } = usePagination(
    paginationSettings,
  );
  const ref = useRef<T>(null);
  const prevMaxCount = usePrevious<number>(
    paginationSettings.maxCount || 1,
  );
  const [initAnimation, setInitAnimation] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || initAnimation) return;
    const elements = [...el.children];
    if (!elements.length) return;

    setInvisibleElementsInParentHeight(
      elements,
      paginationSettings.activeCount || 1,
    );
    setInitAnimation(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationSettings.maxCount]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const elements = [...el.children];
    if (!elements.length || prev === null) return;

    triggerNewOrder({
      elements,
      chunkNumber: paginationSettings.activeCount || 1,
      startMark: from,
      prevStartMark: prev,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const elements = [...el.children];
    if (!elements.length || prev === null) return;

    collapseNewElements({
      activeCount: paginationSettings.activeCount || 1,
      prevMaxCount,
      elements,
      from,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationSettings.maxCount]);

  return [ref, nextStep, prevStep, { from, prev }];
};
