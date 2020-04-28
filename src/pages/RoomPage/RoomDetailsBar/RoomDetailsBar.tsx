import React, { FC } from 'react';
import styled from 'styled-components';
import RoomSettings from './RoomSettings';
import UsersList from './UsersList';

const Wrapper = styled.div`
  display: grid;
`;

const RoomDetailsBar: FC = () => {
  return (
    <Wrapper>
      <RoomSettings />
      <UsersList />
    </Wrapper>
  );
};

export default RoomDetailsBar;
