import React from 'react';
import styled from 'styled-components';
import { logout } from 'fb/auth';
import WithMenuTemplate from 'templates/WithMenuTemplate';

import UserDetails from './UserDetails';

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: 10px;
  grid-column-gap: 5px;
  margin: 5px 10px;
`;
const StyledUserDetails = styled(UserDetails)``;
const ActionLink = styled.a`
  grid-column: 1/-1;
  border: none;
  font-size: ${({ theme }) => theme.fs.s};
  font-weight: 600;
  color: ${({ theme }) => theme.color.blue[0]};
  background-color: transparent;
  text-align: left;
  text-decoration: none;
`;

const UserSettingsPage = () => {
  const handleLogout = e => {
    e.preventDefault();
    logout();
  };
  return (
    <WithMenuTemplate>
      <Wrapper>
        <StyledUserDetails />
        <ActionLink href="/logout" onClick={handleLogout}>
          Wyloguj się!
        </ActionLink>
      </Wrapper>
    </WithMenuTemplate>
  );
};

export default UserSettingsPage;
