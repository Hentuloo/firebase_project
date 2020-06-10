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
import { MultiplayerRaceStats } from 'components/organisms/MultiplayerRaceStats/MultiplayerRaceStats';
import { DarkModeButtonFixed } from 'components/molecules/DarkModeButton';
import { TypingInput } from 'components/organisms';
import RoomDetails from './RoomDetails/RoomDetails';

const Wrapper = styled.div`
  display: grid;
  width: 90%;
  max-width: 1400px;

  margin: 20px auto;
  ${({ theme }) => theme.mediaQuery.md} {
    min-height: 100vh;
    grid-template-columns: 1fr 200px;
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    grid-column-gap: 80px;
    grid-template-columns: 1fr 250px;
  }
`;

const StyledMultiplayerRaceStats = styled(MultiplayerRaceStats)`
  margin: 40px auto;
  max-width: 800px;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
  }
`;
const StyledTypingInput = styled(TypingInput)`
  width: 100%;
  max-width: 700px;
  margin: 0px auto;
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
    // const unSub = subscribeRoom();
    // return () => unSub();
  }, [subscribeRoom]);

  return (
    <Wrapper>
      <RoomDetails
        users={usersArray}
        title={title}
        copyToClipboard={copyRoomLinkToClipboard}
      />
      <Beforeunload onBeforeunload={() => onUserExitRoom()} />
      <StyledMultiplayerRaceStats
        scores={[
          {
            uid: 'asasdf',
            displayName: 'adam',
            accurancy: 98,
            wpmSpeed: 60,
            points: 4,
            progress: 10,
          },
          {
            uid: 'afdsdf',
            displayName: 'asdfasdf',
            accurancy: 80,
            wpmSpeed: 43,
            points: -10,
            progress: 1,
          },
          {
            uid: 'asgdsdf',
            displayName: 'nie ma to ',
            accurancy: 98,
            wpmSpeed: 90,
            points: 22,
            progress: 22,
          },
        ]}
      />
      <StyledTypingInput
        text="some nice training text"
        withoutCounters
      />
      <DarkModeButtonFixed small />
    </Wrapper>
  );
};

export default RoomPage;
