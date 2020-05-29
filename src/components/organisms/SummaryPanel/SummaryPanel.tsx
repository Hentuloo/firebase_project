import React, { FC } from 'react';
import styled from 'styled-components';

import { FilledButton } from 'components/atoms';
import {
  RangImage,
  ProggressChart,
  stickyModal,
} from 'components/molecules';
import { Constants } from 'config/Constants';
import { Link } from 'react-router-dom';
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
  margin: 10px auto;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-column: 2 / span 2;
    grid-row: 2/-1;
  }
`;
const LinkButton = styled(FilledButton)`
  width: 80%;
  text-align: center;
  text-decoration: none;
`;
const ButtonWithRangImage = styled.div`
  display: grid;
  height: 40px;
  grid-template-columns: 1fr 30%;
  justify-content: space-around;
`;

export const SummaryPanel: FC = () => {
  return (
    <Wrapper>
      <UserInfo />
      <ButtonWithRangImage>
        <LinkButton as={Link} to={Constants.paths.solo.path}>
          Tryb pojedyńczy
        </LinkButton>
        <RangImage />
      </ButtonWithRangImage>
      <ProggressChart />
    </Wrapper>
  );
};
