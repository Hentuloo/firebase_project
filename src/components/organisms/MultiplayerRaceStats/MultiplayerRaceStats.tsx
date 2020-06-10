import React, { FC } from 'react';
import styled from 'styled-components';
import { RaceLine } from './RaceLine/RaceLine';
import { LineImage } from './RaceLine/RoadImages';

const Wrapper = styled.div`
  width: 90%;
  ${({ theme }) => theme.mediaQuery.md} {
    padding-right: 100px;
  }
  & > div:last-child {
    ${LineImage} {
      display: none;
    }
  }
`;

export interface MultiplayerRaceScores {
  displayName: string;
  wpmSpeed: number;
  accurancy: number;
  points: number;
  progress: number;
  uid: string;
}
export interface MultiplayerRaceStatsProps {
  scores: MultiplayerRaceScores[];
}

export const MultiplayerRaceStats: FC<MultiplayerRaceStatsProps> = ({
  scores,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      {scores.map(
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
