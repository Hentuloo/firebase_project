import React, { useEffect, FC, useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Db } from 'fb';
import { useSelector } from 'react-redux';
import { getGameSettings } from 'store/selectors/gameSettings.selector';
import { useRedirect } from 'hooks/useRedirect';
import { Constants } from 'config/Constants';
import { toast } from 'react-toastify';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 400px auto;
`;

const RoomPage: FC = () => {
  const redirect = useRedirect();
  const { roomId } = useParams();
  const settings = useSelector(getGameSettings);

  const subscribeRoom = useCallback(() => {
    return Db.init().listenGameSettings(
      roomId,
      ({ name, message }) => {
        if (name === 'FirebaseError') {
          toast.error(Constants.firebaseErrors[name] || message);
          redirect(Constants.paths.dashboard.path);
        }
      },
    );
  }, [redirect, roomId]);

  useEffect(() => {
    const unSub = subscribeRoom();

    return () => unSub();
  }, [subscribeRoom, redirect, roomId]);

  return (
    <Wrapper>
      {JSON.stringify(settings)}
      {/* <RoomDetailsBar /> */}
    </Wrapper>
  );
};

export default RoomPage;
