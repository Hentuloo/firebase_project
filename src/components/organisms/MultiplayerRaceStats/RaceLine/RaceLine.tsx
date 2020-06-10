import React, { FC } from 'react';
import styled from 'styled-components';
import { RoadImages } from './RoadImages';
import { Scores } from './Scores';

const PlayerName = styled.div`
  font-weight: ${({ theme }) => theme.fw[1]};
  color: ${({ theme }) => theme.color.gray[1]};
  opacity: 0.4;
  ${({ theme }) => theme.mediaQuery.md} {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(-120%, -50%);
  }
`;
const Wrapper = styled.div`
  position: relative;
  min-height: 100px;
  display: grid;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
  ${({ theme }) => theme.mediaQuery.md} {
    display: block;
  }
  &:hover {
    ${PlayerName} {
      opacity: 1;
    }
  }
`;
export interface RaceLineProps {
  displayName: string;
  wpmSpeed: number;
  accurancy: number;
  points: number;
  progress: number;
}

export const RaceLine: FC<RaceLineProps> = ({ ...props }) => {
  return (
    <Wrapper {...props}>
      <PlayerName>Adasdfjas</PlayerName>
      <RoadImages />
      <Scores />
    </Wrapper>
  );
};
