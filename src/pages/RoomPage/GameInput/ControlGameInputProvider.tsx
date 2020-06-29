import { FC, ReactElement, useEffect } from 'react';
import { UseInputSpeedTestReturnApi } from 'hooks/useInputSpeedTest/useInputSpeedTest';
import { useSelector, useDispatch } from 'react-redux';
import { getGameSettings } from 'store/selectors/gameSettings.selector';
import { FireFunctions } from 'fb';
import { updateGameScores } from 'store/actions/gameScore.actions';
import { setWaitingForLastScoresUpdate } from 'store/actions/gameSettings.actions';
import { TypingStatus } from 'hooks/useInputSpeedTest/types';

export interface UpdateReachedCursorProviderProps {
  render?: () => ReactElement;
  inputState: UseInputSpeedTestReturnApi;
  roomId: string;
}

export const ControlGameInputProvider: FC<UpdateReachedCursorProviderProps> = ({
  inputState: {
    cursor,
    accuracy,
    startNewMultiplayerGame,
    gameStatus,
    resetGameState,
  },
  roomId,
  render = () => null,
}) => {
  const dispatch = useDispatch();
  const {
    cursorPoints,
    startTimestamp,
    endTimestamp,
    usersByScores,
    registeredUsers,
  } = useSelector(getGameSettings);

  useEffect(() => {
    if (!cursorPoints || !cursor || gameStatus !== 'END') return;
    const index = cursorPoints.findIndex(
      cursorPosition => cursorPosition === cursor,
    );

    if (
      index !== -1 &&
      index === cursorPoints.length - 1 &&
      gameStatus === 'END'
    ) {
      dispatch(setWaitingForLastScoresUpdate());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor, cursorPoints, dispatch, roomId]);
  useEffect(() => {
    if (!cursorPoints || !cursor || gameStatus !== 'TYPING') return;
    const index = cursorPoints.findIndex(
      cursorPosition => cursorPosition === cursor,
    );
    if (index !== -1) {
      const updateCursor = async () => {
        const {
          data: { scores },
        } = await FireFunctions.init().callPointReached(
          roomId,
          accuracy,
          index,
        );
        dispatch(updateGameScores(scores));
      };
      updateCursor();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor, cursorPoints, dispatch, roomId]);
  useEffect(() => {
    if (!endTimestamp || !startTimestamp) return;
    const timeToEnd = Math.ceil(
      endTimestamp - new Date().getTime() / 1000,
    );
    if (timeToEnd <= 0) return;
    startNewMultiplayerGame({
      secondsToEnd: timeToEnd,
      startTimestamp,
    });
  }, [endTimestamp, startNewMultiplayerGame, startTimestamp]);
  useEffect(() => {
    if (gameStatus !== TypingStatus.TYPING) return;
    const usersLength = Object.keys(registeredUsers).length;
    if (usersLength < 2) {
      resetGameState();
    }
  }, [gameStatus, registeredUsers, resetGameState]);
  useEffect(() => {
    if (gameStatus === TypingStatus.END && usersByScores === null) {
      dispatch(setWaitingForLastScoresUpdate());
    }
  }, [dispatch, gameStatus, usersByScores]);

  return render();
};
