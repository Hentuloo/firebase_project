import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CardBackgroud } from 'components/molecules';
import List from './ListWrapper';

const Wrapper = styled.nav`
  width: 60px;
  height: 100%;
  left: 0%;
  top: 0%;
  ${CardBackgroud}
  position: fixed;

  ${({ theme }) => theme.mediaQuery.md} {
    position: relative;
    width: auto;
    height: auto;
  }

  &::before {
    height: 92%;
    width: 140%;
    left: 25%;
    ${({ theme }) => theme.mediaQuery.md} {
      left: 50%;
      width: 95%;
      height: 190%;
      padding: 0px;
    }
  }
`;

export const Navigation = ({ className }) => {
  const handleLogout = () => {};

  return (
    <Wrapper className={className}>
      <List logout={handleLogout} />
    </Wrapper>
  );
};

Navigation.propTypes = {
  className: PropTypes.string,
};
Navigation.defaultProps = {
  className: '',
};
