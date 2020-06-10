import React, { useEffect, FC, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { Db, FireFunctions } from 'fb';
import { useSelector, useDispatch } from 'react-redux';
import { getGameSettings } from 'store/selectors/gameSettings.selector';
import { useRedirect } from 'hooks/useRedirect';
import { Constants } from 'config/Constants';
import { toast } from 'react-toastify';
import { copyToClipBoard } from 'utils';
import { Beforeunload } from 'react-beforeunload';
import { clearRoomFromAvaiable } from 'store/actions/rooms.actions';
import RoomDetails from './RoomDetails/RoomDetails';

const Wrapper = styled.div`
  display: grid;
  width: 80%;
  margin: 20px auto;
`;

const RoomPage: FC = () => {
  const { listen } = useHistory();
  const dispatch = useDispatch();
  const redirect = useRedirect();
  const { roomId } = useParams();
  const { registeredUsers, title, withPassword } = useSelector(
    getGameSettings,
  );

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

  const onUserExitRoom = useCallback(
    async (clearRoomInStore?: boolean) => {
      // remove user from players list
      try {
        if (clearRoomInStore) dispatch(clearRoomFromAvaiable(roomId));
        await FireFunctions.init().leaveRoom(roomId);
        if (clearRoomInStore) dispatch(clearRoomFromAvaiable(roomId));
      } catch ({ message }) {
        if (message === 'INTERNAL') return;
        toast.error(message);
      }
    },
    [dispatch, roomId],
  );

  const usersArray = useMemo(() => Object.keys(registeredUsers), [
    registeredUsers,
  ]).map(uid => ({ ...registeredUsers[uid], uid }));

  const copyRoomLinkToClipboard = useCallback(async () => {
    try {
      const encodedTitle = encodeURI(title);
      await copyToClipBoard(
        `${window.location.origin}${
          Constants.paths.joinRoom.path
        }/${roomId}/${encodedTitle}${withPassword ? '/pass' : ''}`,
      );
      toast.info('Skopiowano link pokoju ddo schowka');
    } catch (e) {
      toast.error('Coś poszło nie tak');
    }
  }, [roomId, title, withPassword]);

  useEffect(() => {
    // on route change remove user from game
    const unsubRouteChange = listen(() => onUserExitRoom(true));
    return () => unsubRouteChange();
  }, [listen, onUserExitRoom]);

  useEffect(() => {
    // on user click "prev-page" button in browser
    const onPrevPage = () => {
      onUserExitRoom();
    };

    window.addEventListener('popstate', onPrevPage);
    return () => window.removeEventListener('popstate', onPrevPage);
  }, [onUserExitRoom]);

  useEffect(() => {
    const unSub = subscribeRoom();
    return () => unSub();
  }, [subscribeRoom]);

  return (
    <Wrapper>
      <Beforeunload onBeforeunload={() => onUserExitRoom()} />
      <RoomDetails
        users={usersArray}
        title={title}
        copyToClipboard={copyRoomLinkToClipboard}
      />
    </Wrapper>
  );
};

export default RoomPage;
