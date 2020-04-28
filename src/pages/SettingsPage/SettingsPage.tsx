import React, { FC } from 'react';
import styled from 'styled-components';
import WithMenuTemplate from 'templates/WithMenuTemplate';

import UserProfile from './UserProfile/UserProfile';

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: 10px;
  grid-column-gap: 5px;
  margin: 5px 10px;
`;

const UserSettingsPage: FC = () => {
  return (
    <WithMenuTemplate>
      <Wrapper>
        <UserProfile />
      </Wrapper>
    </WithMenuTemplate>
  );
};

export default UserSettingsPage;
