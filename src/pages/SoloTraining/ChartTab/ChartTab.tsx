import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { TypingSnapsChart } from 'components/organisms';
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

const StyledTypingSnapsChart = styled(TypingSnapsChart)``;

export interface ChartTabProps {
  changeTab: () => void;
}

export const ChartTab = forwardRef<HTMLDivElement, ChartTabProps>(
  ({ changeTab, ...props }, ref) => {
    return (
      <Wrapper ref={ref} {...props}>
        <Controllers changeTab={changeTab} />
        <StyledTypingSnapsChart
          dates={[
            '2020-05-08',
            '2020-05-08',
            '2020-05-08',
            '2020-05-08',
            '2020-05-08',
          ].map(data => dayjs(data).fromNow())}
          time={[0.4, 2, 2, 2, 2]}
          speed={[20, 40, 32, 21, 44, 11]}
          accurancy={[99, 92, 94, 91, 51, 77]}
        />
      </Wrapper>
    );
  },
);
