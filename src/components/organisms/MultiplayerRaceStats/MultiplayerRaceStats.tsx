import React, { FC } from 'react';
import styled from 'styled-components';
import { GameScoreForStats } from 'types/GameScore';
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

export interface MultiplayerRaceStatsProps {
  scores: GameScoreForStats[];
}

export const MultiplayerRaceStats: FC<MultiplayerRaceStatsProps> = ({
  scores,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      {scores.map(
        ({
          displayName,
          accuracy,
          points,
          progress,
          wpmSpeed,
          difference,
          uid,
        }) => (
          <RaceLine
            key={uid}
            displayName={displayName}
            accuracy={accuracy}
            difference={difference}
            points={points}
            progress={progress}
            wpmSpeed={wpmSpeed}
          />
        ),
      )}
    </Wrapper>
  );
};
