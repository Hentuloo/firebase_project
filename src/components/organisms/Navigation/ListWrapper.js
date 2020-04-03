import React from 'react';
import styled, { css } from 'styled-components';

import { NavLink } from 'react-router-dom';
import { Constants } from 'config/Constants';

import { BarDecorator, ClearButton } from 'components/atoms';

const Wrapper = styled.ul`
  position: absolute;
  width: 90vh;
  left: 50%;
  bottom: 50%;
  display: grid;
  grid-auto-flow: column;
  list-style: none;
  direction: rtl;
  transform-origin: 0% 100%;
  transform: rotate(-90deg) translate(-50%, 0%);
  ${({ theme }) => theme.mediaQuery.md} {
    position: relative;
    width: auto;
    left: auto;
    bottom: auto;
    transform: rotate(0deg) translate(0%, 0%);
    direction: unset;
  }
`;
const ListElement = styled.li`
  display: grid;
  text-align: center;
  ${({ theme }) => theme.mediaQuery.mobileKeyboard} {
    display: none !important;
  }
`;
const LinkElementStyles = css`
  text-decoration: none;
  color: ${({ theme }) => theme.color.brand[1]};
  font-size: ${({ theme }) => theme.fs.xs};
  font-weight: 600;
`;
const LinkElementBar = css`
  ${BarDecorator}

  &::after {
    width: 40px;
    left: 50%;
    opacity: 0.3;
  }
  &.active {
    &::after {
      opacity: 1;
    }
  }
`;
const LinkElement = styled(NavLink)`
  ${LinkElementStyles}
   ${BarDecorator}
  ${LinkElementBar}
`;
const StyledButton = styled(ClearButton)`
  ${LinkElementStyles}
  ${BarDecorator}
  ${LinkElementBar}
`;
const List = () => {
  return (
    <Wrapper>
      <ListElement>
        <LinkElement
          exact
          activeClassName="active"
          to={Constants.paths.root.path}
        >
          {Constants.paths.root.name}
        </LinkElement>
      </ListElement>
      <ListElement className="hide__mobile">
        <LinkElement
          exact
          activeClassName="active"
          to={Constants.paths.settings.path}
        >
          {Constants.paths.settings.name}
        </LinkElement>
      </ListElement>
      <ListElement className="hide__deskop">
        <LinkElement to={Constants.paths.solo.path}>
          {Constants.paths.solo.name}
        </LinkElement>
      </ListElement>
      <ListElement>
        <StyledButton>Wyloguj się</StyledButton>
      </ListElement>
    </Wrapper>
  );
};

export default List;
