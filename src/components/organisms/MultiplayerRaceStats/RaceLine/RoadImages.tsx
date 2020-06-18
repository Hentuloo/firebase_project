import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import lineSvg from 'assets/svg/road/line.svg';
import ligthsLineSvg from 'assets/svg/road/ligthsLine.svg';
import carSvg from 'assets/svg/cars/carDefault.svg';
import gsap from 'gsap';

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

export interface RoadImagesProps {
  progress: number;
  wrapperWidth: number | null;
}

export const RoadImages: FC<RoadImagesProps> = ({
  progress,
  wrapperWidth,
  ...props
}) => {
  const carRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const car = carRef.current;
    if (!car || wrapperWidth === null) return;
    if (progress === 0) return;
    gsap.to(car, {
      x: (progress / 100) * wrapperWidth - car.clientWidth,
      duration: 1,
    });
  }, [progress, wrapperWidth]);

  return (
    <Wrapper {...props}>
      <CarImage ref={carRef} src={carSvg} />
      <LigthsLine src={ligthsLineSvg} />
      <LineImage src={lineSvg} />
    </Wrapper>
  );
};
