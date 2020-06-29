import React, { FC, useState, useCallback } from 'react';
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
  height: calc(100% - 60px);
  margin: 40px auto;
  align-items: center;
  ${({ theme }) => theme.mediaQuery.md} {
    height: 100%;
    margin: 0px auto;
  }
`;

export const NewRoomPage: FC = () => {
  const history = useHistory();
  const [isFetching, setIsFetching] = useState(false);

  const redirectToNewRoom = useCallback(
    ({
      title,
      withPassword,
      roomId,
    }: {
      title: string;
      withPassword: boolean;
      roomId: string;
    }) => {
      const encodedTitle = encodeURI(title);
      copyToClipBoard(
        `${window.location.origin}${
          Constants.paths.joinRoom.path
        }/${roomId}/${encodedTitle}${withPassword ? '/pass' : ''}`,
      );

      toast.info('Skopiowano link do schowka');
      history.push(`${Constants.paths.room.path}/${roomId}`);
    },
    [history],
  );

  const handleCreateRoom = async (state: RoomSetingsState) => {
    try {
      const { title, players, password, withPassword } = state;
      setIsFetching(true);
      const { data } = await FireFunctions.init().createRoom({
        title,
        maxPlayersNumber: players,
        password: withPassword ? password : undefined,
      });
      if (!data) return;
      redirectToNewRoom({ title, withPassword, roomId: data.roomId });
    } catch ({ message, ...sd }) {
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
