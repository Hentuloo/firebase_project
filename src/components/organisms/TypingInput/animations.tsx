import gsap from 'gsap';

export const resetTextAnim = (el: any) => {
  if (!el) throw Error('Element is required');
  const tl = gsap.timeline();

  tl.to(el, { duration: 0.4, y: 0, opacity: 1 });

  return tl;
};

export const hideTextAnim = (el: any) => {
  if (!el) throw Error('Element is required');
  const tl = gsap.timeline();

  tl.to(el, { duration: 0.4, y: '-=50', opacity: 0 });

  return tl;
};

export const resetPointAnim = (el: any) => {
  if (!el) throw Error('Element is required');
  const tl = gsap.timeline();

  tl.set(el, { y: '0', opacity: 0, scale: 1 });

  return tl;
};
export const newPointAnim = (el: any) => {
  if (!el) throw Error('Element is required');
  const tl = gsap.timeline();

  tl.set(el, { y: '-50', opacity: 0, scale: 0.4 });
  tl.to(el, { duration: 0.5, y: '-=25', opacity: 1, scale: 1 }).to(
    el,
    {
      duration: 0.4,
      y: '-=25',
      opacity: 0,
      scale: 0,
      visibility: 'hidden',
    },
    '-=0.05',
  );

  return tl;
};
