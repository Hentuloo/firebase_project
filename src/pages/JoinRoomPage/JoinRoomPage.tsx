import React, { useEffect, FC, useCallback, useState } from 'react';
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

const JoinRoomPage: FC<JoinRoomPageProps> = ({ ...props }) => {
  const redirect = useRedirect();
  const [fetching, isFetching] = useState(false);
  const { roomId, title, withPassword } = useParams();

  const joinRoom = useCallback(
    async (formValues?: JoinWithPasswordForm) => {
      try {
        const { data } = await FireFunctions.init().joinFireRoom(
          roomId,
          formValues && formValues.password,
        );

        if (data.ok)
          redirect(`${Constants.paths.room.path}/${roomId}`);
      } catch ({ message, ...d }) {
        if (message === "this room does'n exist") {
          toast.error('Nie ma takiego pokoju');
          redirect(Constants.paths.dashboard.path);
        } else if (message === 'password is required') {
          redirect(
            `${Constants.paths.joinRoom.path}/${roomId}/${title}/password`,
          );
        } else if (message === 'wrong password') {
          isFetching(false);
          toast.error('Podane hasło jest nieprawidłowe');
        } else {
          toast.error(Constants.firebaseErrors[message] || message);
          redirect(Constants.paths.dashboard.path);
        }
      }
    },
    [redirect, roomId, title],
  );

  useEffect(() => {
    if (withPassword !== undefined) return;
    isFetching(true);
    joinRoom();
  }, [joinRoom, redirect, roomId, withPassword]);

  const handlePasswordButton = (formValues: JoinWithPasswordForm) => {
    isFetching(true);
    joinRoom(formValues);
  };

  if (withPassword !== undefined) {
    return (
      <WithBackgroundTemplate>
        <Wrapper>
          <JoinRoomWithPassword
            roomTitle={title}
            submit={handlePasswordButton}
            fetching={fetching}
          />
        </Wrapper>
        <DarkModeButtonFixed small />
      </WithBackgroundTemplate>
    );
  }

  return (
    <WithBackgroundTemplate>
      <Wrapper {...props}>
        <JoinRoomWithoutPassword
          roomTitle={title}
          fetching={fetching}
        />
      </Wrapper>
      <DarkModeButtonFixed small />
    </WithBackgroundTemplate>
  );
};

export default JoinRoomPage;
