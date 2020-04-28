import gsap from 'gsap';
import { chunkArray } from 'config/utils';

export const setInvisibleElementsInParentHeight = (
  elments: any,
  chunkNumber: number,
) => {
  const tl = gsap.timeline();
  const wrapperHeight = elments[0].parentNode.offsetHeight;

  const elementsInParts = chunkArray(elments, chunkNumber).slice(1);

  elementsInParts.forEach((group, i) => {
    tl.set(group, { y: `-=${i * wrapperHeight}` });
  });

  return tl;
};

export const collapseElements = (
  elements: any,
  direction: boolean,
  wrapperHeight: number,
) => {
  const tl = gsap.timeline();

  const height = wrapperHeight || elements[0].parentNode.offsetHeight;

  tl.to(direction ? elements : elements.reverse(), {
    duration: 0.3,
    y: direction ? `-=${height}` : `+=${height}`,
    stagger: {
      each: 0.1,
    },
  });

  return tl;
};
type triggerNewOrderProps = {
  elements: any;
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
  const wrapperHeight = elements[0].parentNode.offsetHeight;

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
