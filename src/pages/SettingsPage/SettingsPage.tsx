import React, { FC } from 'react';
import styled from 'styled-components';
import WithMenuTemplate from 'templates/WithMenuTemplate';
import { WithBackgroundTemplate } from 'templates/WithBackgroundTemplate';
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
      <WithBackgroundTemplate>
        <Wrapper>
          <UserProfile />
        </Wrapper>
      </WithBackgroundTemplate>
    </WithMenuTemplate>
  );
};

export default UserSettingsPage;
