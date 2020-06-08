import React, { FC } from 'react';
import styled from 'styled-components';

import { FilledButton } from 'components/atoms';
import { RangImage, stickyModal } from 'components/molecules';
import { Constants } from 'config/Constants';
import { Link } from 'react-router-dom';
import { splitSnapsArray } from 'utils/splitSnapsArray';
import { useSoloTrainingSnaps } from 'hooks/useSoloTrainingSnaps';
import UserInfo from './UserInfo';
import { TypingSnapsChart } from '../TypingSnapsChart/TypingSnapsChart';

const Wrapper = styled.div`
  ${stickyModal}
  display: grid;
  width: 80%;
  max-width: 500px;
  grid-column: 1 / span 2;
  align-content: start;
  row-gap: 24px;
  padding: 10px;
  margin: 10px auto;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-column: 2 / span 2;
    grid-row: 2/-1;
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    grid-row-gap: 40px;
  }
`;
const LinkButton = styled(FilledButton)`
  width: 80%;
  text-align: center;
  text-decoration: none;
`;
const ButtonWithRangImage = styled.div`
  display: grid;

  ${({ theme }) => theme.mediaQuery.md} {
    height: auto;
    grid-template-columns: 1fr 30%;
  }
`;
const StyledTypingSnapsChart = styled(TypingSnapsChart)`
  display: none;
  ${({ theme }) => theme.mediaQuery.md} {
    display: block;
  }
`;
const StyledRangImage = styled(RangImage)`
  position: absolute;
  top: 2%;
  right: 8%;
  height: 100px;
  width: 100px;
`;
export const SummaryPanel: FC = () => {
  const { snaps } = useSoloTrainingSnaps();
  const { times, speeds, accurances, dates } = splitSnapsArray(
    snaps.slice(-7),
  );
  return (
    <Wrapper>
      <UserInfo />
      <ButtonWithRangImage>
        <LinkButton as={Link} to={Constants.paths.solo.path}>
          Tryb pojedyńczy
        </LinkButton>
        <StyledRangImage />
      </ButtonWithRangImage>
      {snaps.length > 1 && (
        <StyledTypingSnapsChart
          dates={dates}
          time={times}
          speed={speeds}
          accurancy={accurances}
        />
      )}
    </Wrapper>
  );
};
