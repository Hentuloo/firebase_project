import React, { FC } from 'react';
import styled from 'styled-components';
import lineSvg from 'assets/svg/road/line.svg';
import ligthsLineSvg from 'assets/svg/road/ligthsLine.svg';
import carSvg from 'assets/svg/cars/carDefault.svg';

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

export interface RaceLineProps {
  displayName: string;
  wpmSpeed: number;
  accurancy: number;
  points: number;
  progress: number;
}

export interface RoadImagesProps {}

export const RoadImages: FC<RoadImagesProps> = ({ ...props }) => {
  return (
    <Wrapper {...props}>
      <CarImage src={carSvg} />
      <LigthsLine src={ligthsLineSvg} />
      <LineImage src={lineSvg} />
    </Wrapper>
  );
};
