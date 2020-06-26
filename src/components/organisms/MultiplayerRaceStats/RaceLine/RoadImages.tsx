import React, {
  FC,
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';
import styled from 'styled-components';
import lineSvg from 'assets/svg/road/line.svg';
import ligthsLineSvg from 'assets/svg/road/ligthsLine.svg';
import carSvg from 'assets/svg/cars/carDefault.svg';
import gsap, { Linear } from 'gsap';

const Wrapper = styled.div`
  display: none;
  ${({ theme }) => theme.mediaQuery.md} {
    display: block;
  }
`;
export const LineImage = styled.img`
  position: absolute;
  width: 100%;
  bottom: 0%;
  transform: translate(0%, 50%);
  overflow: hidden;
`;
const LigthsLine = styled.img`
  position: absolute;
  width: 75%;
  top: 50%;
  left: 20%;
  transform: translate(0%, -50%);
  z-index: -1;
`;
const CarImage = styled.img`
  position: absolute;
  max-height: 85%;
  top: 50%;
  transform: translate(0%, -50%) rotate(47deg);
  transform-origin: 50% 50%;
`;

interface MoveCarAnimationProps {
  percents: number;
  duration?: number;
  delay?: number;
}

export interface RoadImagesProps {
  progress: number;
  wrapperWidth: number | null;
  startTimestamp?: number | null;
  endTimestamp?: number | null;
}

export const RoadImages: FC<RoadImagesProps> = ({
  progress,
  wrapperWidth,
  startTimestamp,
  endTimestamp,
  ...props
}) => {
  const carRef = useRef<HTMLImageElement>(null);
  const [isAnimation, setAnimationFlag] = useState(false);

  const moveCar = useCallback(
    ({ percents, duration, delay }: MoveCarAnimationProps) => {
      const car = carRef.current;
      if (!car || wrapperWidth === null) return;
      return gsap.to(car, {
        x: (percents / 100) * (wrapperWidth - car.clientWidth),
        duration: duration || 6,
        ease: Linear.easeIn,
        delay: delay || 0,
      });
    },
    [wrapperWidth],
  );
  const resetCarPosition = useCallback(() => {
    const car = carRef.current;
    if (!car || wrapperWidth === null) return;
    return gsap.to(car, {
      x: 0,
      duration: 1,
      ease: Linear.easeIn,
    });
  }, [wrapperWidth]);

  useEffect(() => {
    if (progress === 0 || progress === null) return;
    if (endTimestamp && startTimestamp) {
      const pastedTime = new Date().getTime() - startTimestamp * 1000;
      const duration = (endTimestamp - startTimestamp) * 1000;
      const prevPercents = (pastedTime / duration) * 100;

      if (prevPercents > progress) return;
    }

    const animSub = moveCar({ percents: progress });
    if (animSub) {
      setAnimationFlag(true);
      animSub.eventCallback('onComplete', () => {
        setAnimationFlag(false);
      });
    }
    return () => {
      if (animSub) animSub.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveCar, progress]);

  useEffect(() => {
    if (!startTimestamp || !endTimestamp || isAnimation) return;
    const delay =
      (startTimestamp * 1000 - new Date().getTime()) / 1000;
    const duration =
      (endTimestamp * 1000 - new Date().getTime()) / 1000;

    if (duration < 0) return;
    if (delay > 0) resetCarPosition();

    const animSub = moveCar({
      delay: delay < 0 ? 0 : delay,
      duration,
      percents: 100,
    });
    return () => {
      if (animSub) animSub.kill();
    };
  }, [
    startTimestamp,
    endTimestamp,
    moveCar,
    isAnimation,
    resetCarPosition,
  ]);

  return (
    <Wrapper {...props}>
      <CarImage ref={carRef} src={carSvg} />
      <LigthsLine src={ligthsLineSvg} />
      <LineImage src={lineSvg} />
    </Wrapper>
  );
};
