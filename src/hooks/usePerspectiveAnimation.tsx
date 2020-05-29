import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const usePerspectiveAnimation = <T extends HTMLElement>(
  dampen = 20,
) => {
  const ref = useRef<T>(null);
  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    gsap.set(target, {
      transformOrigin: '50% 50%',
      transformPerspective: 600,
    });

    const resetEffect = () => {
      gsap.to(target, {
        duration: 0.5,
        rotateY: 0,
        rotateX: 0,
        scale: 1,
      });
    };
    const entryEffect = () => {
      gsap.to(target, {
        duration: 0.5,
        scale: 1.07,
      });
    };

    const hoverEffect = (mouse: any) => {
      const { clientX, clientY } = mouse || mouse.touches[0];
      const rect = mouse.currentTarget.getBoundingClientRect();

      const x = clientX - rect.left; // x position within the element.
      const y = clientY - rect.top; // y position within the element.

      const rotateY = -(target.clientWidth / 2 - x) / dampen;
      const rotateX = (target.clientHeight / 2 - y) / dampen;

      gsap.to(target, {
        duration: 0.5,
        rotateY,
        rotateX,
      });
    };
    target.addEventListener('mousemove', hoverEffect);
    target.addEventListener('mouseleave', resetEffect);
    target.addEventListener('mouseenter', entryEffect);
    return () => {
      target.removeEventListener('mousemove', hoverEffect);
      target.removeEventListener('mouseleave', resetEffect);
      target.removeEventListener('mouseenter', entryEffect);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
};
