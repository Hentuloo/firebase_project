import React, { FC } from 'react';
import styled from 'styled-components';
import WithMenuTemplate from 'templates/WithMenuTemplate';
import {
  RoomSetings,
  RoomSetingsState,
} from 'components/organisms/RoomSettings';
import { WithBackgroundTemplate } from 'templates/WithBackgroundTemplate';

const StyledWithBackgroundTemplate = styled(WithBackgroundTemplate)`
  display: grid;
  align-items: center;
`;

export const NewRoomPage: FC = () => {
  const handleCreateRoom = (state: RoomSetingsState) => {
    console.log(state);
  };
  return (
    <WithMenuTemplate>
      <StyledWithBackgroundTemplate>
        <RoomSetings onSubmit={handleCreateRoom} />
      </StyledWithBackgroundTemplate>
    </WithMenuTemplate>
  );
};
