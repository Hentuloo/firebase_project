import React, { useEffect, FC, useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useRedirect } from 'hooks/useRedirect';
import { Constants } from 'config/Constants';

import { FireFunctions } from 'fb';
import { toast } from 'react-toastify';
import { WithBackgroundTemplate } from 'templates/WithBackgroundTemplate';
import { DarkModeButtonFixed } from 'components/molecules/DarkModeButton';
import {
  JoinRoomWithPassword,
  JoinWithPasswordForm,
} from './JoinRoomWithPassword';
import { JoinRoomWithoutPassword } from './JoinRoomWithoutPassword';

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  justify-items: center;
  align-items: center;
`;

export interface JoinRoomPageProps {}

export const JoinRoomPage: FC<JoinRoomPageProps> = ({ ...props }) => {
  const redirect = useRedirect();
  const { roomId, title, withPassword } = useParams();

  const joinRoom = useCallback(
    async (formValues?: JoinWithPasswordForm) => {
      const { joinFireRoom } = FireFunctions.init();
      try {
        const { data } = await joinFireRoom(
          roomId,
          formValues && formValues.password,
        );
        if (data.ok)
          redirect(`${Constants.paths.room.path}/${roomId}`);
      } catch ({ message, ...d }) {
        if (message === "this room does'n exist") {
          toast.error('Nie ma takiego pokoju');
          redirect(Constants.paths.dashboard.path);
        }
        if (message === 'password is required')
          redirect(
            `${Constants.paths.joinRoom.path}/${roomId}/${title}/password`,
          );
        if (message === 'wrong password')
          toast.error('Podane hasło jest nieprawidłowe');
      }
    },
    [redirect, roomId, title],
  );

  useEffect(() => {
    if (withPassword !== undefined) return;
    joinRoom();
  }, [joinRoom, redirect, roomId, withPassword]);

  const handlePasswordButton = (formValues: JoinWithPasswordForm) => {
    joinRoom(formValues);
  };

  if (withPassword !== undefined) {
    return (
      <WithBackgroundTemplate>
        <Wrapper>
          <JoinRoomWithPassword
            roomTitle={title}
            submit={handlePasswordButton}
          />
        </Wrapper>
        <DarkModeButtonFixed small />
      </WithBackgroundTemplate>
    );
  }

  return (
    <WithBackgroundTemplate>
      <Wrapper {...props}>
        <JoinRoomWithoutPassword roomTitle={title} />
      </Wrapper>
      <DarkModeButtonFixed small />
    </WithBackgroundTemplate>
  );
};
