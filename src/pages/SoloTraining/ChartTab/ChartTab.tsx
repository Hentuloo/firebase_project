import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { TypingSnapsChart } from 'components/organisms';
import { Snap } from 'store/reducers/soloTraining.reducer';
import dayjs from 'dayjs';
import { Controllers } from './Controllers';

const Wrapper = styled.div`
  position: absolute;
  display: grid;
  grid-template-rows: 1fr 50px 50px;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
  opacity: 0;
  align-items: center;
  grid-column-gap: 25px;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-template-rows: 1fr 200px 50px;
    grid-template-columns: 40px 1fr;
  }
`;

const splitSnapsArray = (charts: Snap[]) =>
  charts.reduce<{
    times: number[];
    speeds: number[];
    accurances: number[];
    dates: string[];
  }>(
    (acc, { accuracy, speed, time, date }) => {
      acc.times.push(time);
      acc.speeds.push(speed);
      acc.accurances.push(accuracy);
      acc.dates.push(dayjs(date).fromNow());
      return acc;
    },
    { times: [], speeds: [], accurances: [], dates: [] },
  );

const StyledTypingSnapsChart = styled(TypingSnapsChart)``;

export interface ChartTabProps {
  changeTab: () => void;
  charts: Snap[];
}
export const ChartTab = forwardRef<HTMLDivElement, ChartTabProps>(
  ({ changeTab, charts, ...props }, ref) => {
    const { times, speeds, accurances, dates } = splitSnapsArray(
      charts.slice(-10),
    );
    return (
      <Wrapper ref={ref} {...props}>
        <Controllers changeTab={changeTab} />
        <StyledTypingSnapsChart
          dates={dates}
          time={times}
          speed={speeds}
          accurancy={accurances}
        />
      </Wrapper>
    );
  },
);
