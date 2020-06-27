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
    if (!cursorPoints || !cursor || gameStatus === 'BEGINING') return;
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
        if (
          index === cursorPoints.length - 1 &&
          gameStatus === 'END'
        ) {
          dispatch(setWaitingForLastScoresUpdate());
        }
      };
      updateCursor();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor, cursorPoints, dispatch, roomId]);
  useEffect(() => {
    if (!startTimestamp) return;

    startNewMultiplayerGame({
      secondsToEnd: (endTimestamp || 0) - startTimestamp,
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
