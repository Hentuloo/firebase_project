import React from 'react';
import styled from 'styled-components';

import { FilledButton } from 'components/atoms';
import {
  RangImage,
  ProggressChart,
  stickyModal,
} from 'components/molecules';
import UserInfo from './UserInfo';

const Wrapper = styled.div`
  ${stickyModal}
  display: grid;
  width: 80%;
  max-width: 500px;
  grid-column: 1 / span 2;
  align-content: start;
  row-gap: 24px;
  padding: 10px;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-column: 2 / span 2;
    grid-row: 2/-1;
  }
`;
const StyledFilledButton = styled(FilledButton)`
  width: 80%;
`;
const ButtonWithRangImage = styled.div`
  display: grid;
  height: 40px;
  grid-template-columns: 1fr 30%;
  justify-content: space-around;
`;

export const SummaryPanel = () => {
  return (
    <Wrapper>
      <UserInfo />
      <ButtonWithRangImage>
        <StyledFilledButton>Tryb pojedyńczy</StyledFilledButton>
        <RangImage />
      </ButtonWithRangImage>
      <ProggressChart />
    </Wrapper>
  );
};
