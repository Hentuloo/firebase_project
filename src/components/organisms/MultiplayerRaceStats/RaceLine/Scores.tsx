import React, { FC, useMemo } from 'react';
import styled, { css } from 'styled-components';
import Tippy from '@tippyjs/react';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  text-align: center;
  grid-column-gap: 10px;
  grid-row-gap: 5px;
  justify-items: center;
  align-items: center;

  ${({ theme }) => theme.mediaQuery.md} {
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translate(0%, -50%);
  }
`;
const Points = styled.span`
  grid-row: 1/-1;
  font-size: ${({ theme }) => theme.fs.xxxl};
  ${({ color }: { color: PointsColor }) => css`
    color: ${({ theme }) => theme.color.points[color]};
  `}
`;
const Speed = styled.span``;
const Accuracy = styled.span``;

type PointsColor = 'RED' | 'GREEN' | 'DEFAULT';

export interface ScoresProps {
  wpmSpeed: number;
  accuracy: number;
  points: number;
  difference: number;
}

export const Scores: FC<ScoresProps> = ({
  wpmSpeed,
  accuracy,
  points,
  difference,
  ...props
}) => {
  const pointsColor = useMemo((): PointsColor => {
    if (difference < -2) return 'RED';
    if (difference > 2) return 'GREEN';
    return 'DEFAULT';
  }, [difference]);
  return (
    <Tippy content={`Zdobyte punkty: ${points || 0}`}>
      <Wrapper {...props}>
        <Points color={pointsColor}>{difference}P</Points>
        <Speed>{wpmSpeed}WPM</Speed>
        <Accuracy>{accuracy}%</Accuracy>
      </Wrapper>
    </Tippy>
  );
};
