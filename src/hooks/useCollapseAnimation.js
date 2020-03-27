import { useEffect, useRef } from 'react';
import { usePagination } from 'hooks/usePagination';
import {
  setInvisibleElementsInParentHeight,
  triggerNewOrder,
} from './utils/collapseAnimation';

export const useCollapseAnimation = paginationSettings => {
  const { from, prev, nextStep, prevStep } = usePagination(
    paginationSettings,
  );
  const ref = useRef(null);

  useEffect(() => {
    const elements = [...ref.current.children];
    if (!elements.length) return;
    setInvisibleElementsInParentHeight(
      elements,
      paginationSettings.activeCount,
    );
  }, []);

  useEffect(() => {
    const elements = [...ref.current.children];
    if (!elements.length || prev === null) return;
    triggerNewOrder({
      elements,
      chunkNumber: paginationSettings.activeCount,
      startMark: from,
      prevStartMark: prev,
    });
  }, [from]);

  return [ref, nextStep, prevStep, { from, prev }];
};
