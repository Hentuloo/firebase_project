import React, { FC, useState } from 'react';
import styled from 'styled-components';
import WithMenuTemplate from 'templates/WithMenuTemplate';
import {
  RoomSetings,
  RoomSetingsState,
} from 'components/organisms/RoomSettings';
import { WithBackgroundTemplate } from 'templates/WithBackgroundTemplate';
import { FireFunctions } from 'fb';
import { useHistory } from 'react-router-dom';
import { Constants } from 'config/Constants';
import { copyToClipBoard } from 'utils';
import { toast } from 'react-toastify';

const StyledWithBackgroundTemplate = styled(WithBackgroundTemplate)`
  display: grid;
  align-items: center;
`;

export const NewRoomPage: FC = () => {
  const history = useHistory();
  const [isFetching, setIsFetching] = useState(false);
  const handleCreateRoom = async (state: RoomSetingsState) => {
    const { title, players, password, withPassword } = state;
    setIsFetching(true);
    try {
      const { data } = await FireFunctions.init().createRoom({
        title,
        maxPlayersNumber: players,
        password: withPassword ? password : undefined,
      });
      const encodedTitle = encodeURI(title);
      await copyToClipBoard(
        `${window.location.origin}${Constants.paths.joinRoom.path}/${
          data.roomId
        }/${encodedTitle}${withPassword ? '/pass' : ''}`,
      );

      toast.info('Skopiowano link do schowka');
      history.push(`${Constants.paths.room.path}/${data.roomId}`);
    } catch ({ message, ...d }) {
      setIsFetching(false);
      toast.error(message);
    }
  };
  return (
    <WithMenuTemplate>
      <StyledWithBackgroundTemplate>
        <RoomSetings
          onSubmit={handleCreateRoom}
          isFetching={isFetching}
        />
      </StyledWithBackgroundTemplate>
    </WithMenuTemplate>
  );
};
