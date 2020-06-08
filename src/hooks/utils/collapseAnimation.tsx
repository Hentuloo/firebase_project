import gsap from 'gsap';
import { chunkArray } from 'utils';

export const setInvisibleElementsInParentHeight = (
  elements: Element[],
  chunkNumber: number,
) => {
  const tl = gsap.timeline();
  const wrapperHeight = (elements[0].parentNode as HTMLElement)
    .offsetHeight;

  const elementsInParts = chunkArray(elements, chunkNumber).slice(1);

  elementsInParts.forEach((group, i) => {
    tl.set(group, { y: `-=${i * wrapperHeight}` });
  });

  return tl;
};

export const collapseElements = (
  elements: Element[],
  direction: boolean,
  wrapperHeight: number,
) => {
  const tl = gsap.timeline();

  const height =
    wrapperHeight ||
    (elements[0].parentNode as HTMLElement).offsetHeight;

  tl.to(direction ? elements : elements.reverse(), {
    duration: 0.3,
    y: direction ? `-=${height}` : `+=${height}`,
    stagger: {
      each: 0.1,
    },
  });

  return tl;
};

export interface CollapseNewElements {
  activeCount: number;
  prevMaxCount: number;
  elements: Element[];
  from: number;
}
export const collapseNewElements = ({
  activeCount,
  prevMaxCount,
  elements,
  from,
}: CollapseNewElements) => {
  const tl = gsap.timeline();

  const stepNumber = from / activeCount;
  const wrapperHeight = (elements[0].parentNode as HTMLElement)
    .offsetHeight;
  const differnceCount = activeCount - (prevMaxCount % activeCount);
  if (differnceCount !== 0) {
    gsap.set(elements.slice(prevMaxCount), {
      y: `-=${wrapperHeight * stepNumber}`,
    });
  }

  return tl;
};

type triggerNewOrderProps = {
  elements: Element[];
  chunkNumber: number;
  startMark: number;
  prevStartMark: number;
};
export const triggerNewOrder = ({
  elements,
  chunkNumber,
  startMark,
  prevStartMark,
}: triggerNewOrderProps) => {
  const tl = gsap.timeline();
  const animationDirection = startMark > prevStartMark; // if start is greather than prev show next elements else show prev
  const wrapperHeight = (elements[0].parentNode as HTMLElement)
    .offsetHeight;

  const prevElements = elements.slice(
    prevStartMark,
    prevStartMark + chunkNumber,
  );
  const nextElements = elements.slice(
    startMark,
    startMark + chunkNumber,
  );

  tl.add(
    collapseElements(prevElements, animationDirection, wrapperHeight),
  ).add(
    collapseElements(nextElements, animationDirection, wrapperHeight),
    '-=0.2',
  );

  return tl;
};
