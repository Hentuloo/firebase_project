import React, { FC } from 'react';
import styled from 'styled-components';

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
`;
const Speed = styled.span``;
const Accuracy = styled.span``;

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
  return (
    <Wrapper {...props}>
      <Points>{difference}P</Points>
      <Speed>{wpmSpeed}WPM</Speed>
      <Accuracy>{accuracy}%</Accuracy>
    </Wrapper>
  );
};
