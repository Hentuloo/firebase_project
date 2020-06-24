import React, { FC } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Navigation } from 'components/organisms';
import { DarkModeButtonFixed } from 'components/molecules/DarkModeButton';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-template-columns: 1fr minmax(500px, 40%);
    grid-template-rows: 55px auto;
    grid-row-gap: 60px;
  }

  ${({ theme }) => theme.mediaQuery.lg} {
    grid-template-rows: 75px auto;
  }
`;
const ContentWrapper = styled.div`
  display: grid;
  height: 100%;
  padding: 5px 0px 5px 5px;
  ${({ theme }) => theme.mediaQuery.md} {
    min-height: calc(100vh - 125px);
    grid-column: 1 / -1;
    grid-row: 2 / span 1;
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    min-height: calc(100vh - 145px);
  }
`;
const StyledNavigation = styled(Navigation)`
  grid-column: 1 / span 1;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-column: 2 / -1;
    grid-row: 1 / span 1;
    align-self: center;
  }
`;

interface WithMenuTemplateProps {
  children: React.ReactNode;
}

const WithMenuTemplate: FC<WithMenuTemplateProps> = ({
  children,
}) => {
  return (
    <Wrapper>
      <DarkModeButtonFixed small />
      <StyledNavigation />
      <ContentWrapper>{children}</ContentWrapper>
    </Wrapper>
  );
};

WithMenuTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WithMenuTemplate;
