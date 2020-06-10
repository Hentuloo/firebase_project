import React, { FC } from 'react';
import styled from 'styled-components';
import { RoadImages, RoadImagesProps } from './RoadImages';
import { Scores, ScoresProps } from './Scores';

const PlayerName = styled.div`
  font-weight: ${({ theme }) => theme.fw[1]};
  font-size: ${({ theme }) => theme.fs.xxs};
  color: ${({ theme }) => theme.color.gray[1]};
  opacity: 0.4;
  ${({ theme }) => theme.mediaQuery.md} {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(calc(-100% - 10px), -50%);
  }
`;
const Wrapper = styled.div`
  position: relative;
  min-height: 60px;
  display: grid;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
  ${({ theme }) => theme.mediaQuery.md} {
    min-height: 100px;
    display: block;
  }
  &:hover {
    ${PlayerName} {
      opacity: 1;
    }
  }
`;
export interface RaceLineProps extends RoadImagesProps, ScoresProps {
  displayName: string;
}

export const RaceLine: FC<RaceLineProps> = ({
  displayName,
  accurancy,
  points,
  progress,
  wpmSpeed,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <PlayerName>{displayName}</PlayerName>
      <RoadImages progress={progress} />
      <Scores
        accurancy={accurancy}
        points={points}
        wpmSpeed={wpmSpeed}
      />
    </Wrapper>
  );
};
