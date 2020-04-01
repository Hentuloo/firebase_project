import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const usePerspectiveAnimation = (dampen = 20) => {
  const ref = useRef(null);
  useEffect(() => {
    const target = ref.current;

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
    const hoverEffect = mouse => {
      const { clientX, clientY } = mouse || mouse.touches[0];

      // Get mouse x position within card
      const x =
        clientX -
        (target.offsetLeft -
          (window.scrollX ||
            window.pageXOffset ||
            document.body.scrollLeft));

      // Get mouse y position within card
      const y =
        clientY -
        (target.offsetTop -
          (window.scrollY ||
            window.pageYOffset ||
            document.body.scrollTop));

      const rotateX = -(y - target.clientHeight / 2) / dampen;
      const rotateY = (x - target.clientWidth / 2) / dampen;

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
  }, []);

  return ref;
};
