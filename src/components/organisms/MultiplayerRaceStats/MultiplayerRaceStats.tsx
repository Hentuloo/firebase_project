import React, { FC } from 'react';
import styled from 'styled-components';
import { RaceLine } from './RaceLine/RaceLine';
import { LineImage } from './RaceLine/RoadImages';

const Wrapper = styled.div`
  width: 90%;
  & > div:last-child {
    ${LineImage} {
      display: none;
    }
  }
`;

export interface Scores {
  [uid: string]: {
    displayName: string;
    wpmSpeed: number;
    accurancy: number;
    points: number;
    progress: number;
  };
}

const exampleScores = [
  {
    displayName: 'adam',
    accurancy: 98,
    wpmSpeed: 60,
    points: 4,
    progress: 10,
  },
  {
    displayName: 'asdfasdf',
    accurancy: 80,
    wpmSpeed: 43,
    points: -10,
    progress: 1,
  },
  {
    displayName: 'nie ma to ',
    accurancy: 98,
    wpmSpeed: 90,
    points: 22,
    progress: 22,
  },
];

export interface MultiplayerRaceStatsProps {}

export const MultiplayerRaceStats: FC<MultiplayerRaceStatsProps> = ({
  ...props
}) => {
  return (
    <Wrapper {...props}>
      {exampleScores.map(
        ({ displayName, accurancy, points, progress, wpmSpeed }) => (
          <RaceLine
            key={displayName}
            displayName={displayName}
            accurancy={accurancy}
            points={points}
            progress={progress}
            wpmSpeed={wpmSpeed}
          />
        ),
      )}
    </Wrapper>
  );
};
