import React, { FC, useRef, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { Line } from 'react-chartjs-2';
import useIsMobile from 'hooks/useIsMobile';

const Wrapper = styled.div`
  position: relative;
  width: calc(100% - 10px);
  max-width: 800px;
  min-height: 270px;
  ${({ theme }) => theme.mediaQuery.md} {
    min-height: auto;
  }
`;

export interface TypingSnapsChartProps {
  dates: string[];
  time: number[];
  speed: number[];
  accurancy: number[];
}

export const TypingSnapsChart: FC<TypingSnapsChartProps> = ({
  dates,
  time,
  speed,
  accurancy,
  ...props
}) => {
  const ref = useRef<Line>(null);
  const theme = useTheme();
  const isMoblie = useIsMobile();

  useEffect(() => {
    const chart = ref.current;
    if (!chart) return;
    const resize = () => {
      chart.chartInstance.update();
    };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  });

  const dataSetProps = (index: number) => ({
    fill: false,
    pointRadius: 3,
    hoverRadius: 5,
    borderColor: theme.color.chart[index],
    pointBackgroundColor: theme.color.chart[index],
    pointBorderColor: theme.color.chart[index],
    pointHoverBackgroundColor: theme.color.chart[index],
  });

  return (
    <Wrapper {...props}>
      <Line
        options={{
          maintainAspectRatio: !isMoblie,
          tooltips: {
            mode: 'x',
            intersect: false,
          },
        }}
        ref={ref}
        data={{
          labels: dates,
          datasets: [
            {
              label: 'Accuracy',
              data: accurancy,
              ...dataSetProps(0),
            },
            {
              label: 'Speed',
              data: speed,
              ...dataSetProps(1),
            },
            {
              label: 'Time',
              data: time,
              ...dataSetProps(2),
            },
          ],
        }}
      />
    </Wrapper>
  );
};
