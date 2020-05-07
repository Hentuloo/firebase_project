import React, { FC } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';

const Wrapper = styled.div``;

export interface TypingSnapsChartProps {
  time: any[];
  speed: any[];
  accurancy: any[];
}

export const TypingSnapsChart: FC<TypingSnapsChartProps> = ({
  time,
  speed,
  accurancy,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <Line
        data={{
          labels: ['Speed', 'Duration', 'accuracy'],
          datasets: [
            {
              label: 'acc',
              data: accurancy,
            },
            {
              label: 'speed',
              data: speed,
            },
            {
              label: 'time',
              data: time,
            },
          ],
        }}
      />
    </Wrapper>
  );
};
