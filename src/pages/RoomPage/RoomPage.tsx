import React, { useEffect, FC, useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Db, FireFunctions } from 'fb';
import { useSelector, useDispatch } from 'react-redux';
import {
  getGameSettings,
  getRegisteredUserInArray,
} from 'store/selectors/gameSettings.selector';
import { useRedirect } from 'hooks/useRedirect';
import { Constants } from 'config/Constants';
import { toast } from 'react-toastify';
import { copyToClipBoard } from 'utils';
import { clearRoomFromAvaiable } from 'store/actions/rooms.actions';
import { MultiplayerRaceStats } from 'components/organisms/MultiplayerRaceStats/MultiplayerRaceStats';
import { DarkModeButtonFixed } from 'components/molecules/DarkModeButton';
import { getUser } from 'store/selectors/user.selector';
import { getGameScoresByRegisteredUsers } from 'store/selectors/gameScores.selector';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {
  gameStartRequest,
  clearGameSettings,
} from 'store/actions/gameSettings.actions';
import RoomDetails from './RoomDetails/RoomDetails';
import { GameInput } from './GameInput/GameInput';
import { PodiumModal } from './PodiumModal/PodiumModal';
import { LastScoresUpdateModal } from './LastScoresUpdateModal';
import { LigthsCountingModal } from './LigthsCountingModal';

dayjs.extend(duration);

const Wrapper = styled.div`
  display: grid;
  width: 90%;
  max-width: 1400px;
  padding: 20px 0px;
  margin: 0px auto;
  ${({ theme }) => theme.mediaQuery.md} {
    min-height: 100vh;
    grid-template-columns: 1fr 200px;
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    grid-template-columns: 1fr 270px;
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    grid-template-columns: 1fr 320px;
    grid-column-gap: 80px;
  }
`;

const StyledMultiplayerRaceStats = styled(MultiplayerRaceStats)`
  max-width: 650px;
  margin: 40px auto;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    max-width: 800px;
  }
`;

const RoomPage: FC = () => {
  const dispatch = useDispatch();
  const redirect = useRedirect();
  const { roomId } = useParams();
  const {
    title,
    withPassword,
    creator,
    startTimestamp,
    endTimestamp,
  } = useSelector(getGameSettings);
  const regiteredUsers = useSelector(getRegisteredUserInArray);
  const { uid } = useSelector(getUser);
  const scores = useSelector(getGameScoresByRegisteredUsers);

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
    (clearRoomInStore?: boolean) => {
      // remove user from players list
      try {
        if (clearRoomInStore) dispatch(clearRoomFromAvaiable(roomId));
        FireFunctions.init()
          .leaveRoom(roomId)
          .then(() => {
            if (clearRoomInStore)
              dispatch(clearRoomFromAvaiable(roomId));
          });
      } catch ({ message }) {
        if (message === 'INTERNAL') return;
        toast.error(message);
      }
    },
    [dispatch, roomId],
  );

  const handleStartGame = useCallback(async () => {
    try {
      dispatch(gameStartRequest(true));
      await FireFunctions.init().startGame(roomId);
    } catch ({ message }) {
      toast.error(message);
      dispatch(gameStartRequest(false));
    }
  }, [dispatch, roomId]);

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
    const unSub = subscribeRoom();
    return () => unSub();
  }, [subscribeRoom]);

  useEffect(() => {
    // clear room (in store and cloud) on route change
    return () => {
      onUserExitRoom(true);
      dispatch(clearGameSettings());
    };
  }, [dispatch, onUserExitRoom]);

  useEffect(() => {
    dispatch(clearGameSettings());
  }, [dispatch]);

  return (
    <Wrapper>
      <RoomDetails
        users={regiteredUsers}
        title={title}
        copyToClipboard={copyRoomLinkToClipboard}
        isCreator={creator === uid}
        onStartGame={handleStartGame}
      />
      <StyledMultiplayerRaceStats
        scores={scores}
        startTimestamp={startTimestamp}
        endTimestamp={endTimestamp}
      />
      <GameInput roomId={roomId} />
      <DarkModeButtonFixed small />
      <PodiumModal />
      <LastScoresUpdateModal />
      <LigthsCountingModal />
    </Wrapper>
  );
};

export default RoomPage;
