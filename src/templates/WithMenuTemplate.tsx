import React, { FC } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Navigation } from 'components/organisms';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 65px 1fr;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-template-columns: 1fr minmax(500px, 40%);
    grid-template-rows: 55px auto;
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    grid-template-rows: 75px auto;
  }
`;
const ContentWrapper = styled.div`
  grid-column: 2 / -1;
  padding: 5px 0px 5px 5px;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-column: 1 / -1;
    grid-row: 2 / span 1;
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
      <StyledNavigation />
      <ContentWrapper>{children}</ContentWrapper>
    </Wrapper>
  );
};

WithMenuTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WithMenuTemplate;
