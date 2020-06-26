import { FC, ReactElement, useEffect } from 'react';
import { UseInputSpeedTestReturnApi } from 'hooks/useInputSpeedTest/useInputSpeedTest';
import { useSelector, useDispatch } from 'react-redux';
import { getGameSettings } from 'store/selectors/gameSettings.selector';
import { FireFunctions } from 'fb';
import { updateGameScores } from 'store/actions/gameScore.actions';
import { setWaitingForLastScoresUpdate } from 'store/actions/gameSettings.actions';

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
  },
  roomId,
  render = () => null,
}) => {
  const dispatch = useDispatch();
  const { cursorPoints, startTimestamp, endTimestamp } = useSelector(
    getGameSettings,
  );

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
    const timeToStart = startTimestamp * 1000 - new Date().getTime();
    if (timeToStart > 0) {
      startNewMultiplayerGame({
        secondsToEnd: (endTimestamp || 0) - startTimestamp,
        startTimestamp,
      });
    }
  }, [endTimestamp, startNewMultiplayerGame, startTimestamp]);

  return render();
};
