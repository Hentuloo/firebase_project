import { FC, ReactElement, useEffect } from 'react';
import { UseInputSpeedTestReturnApi } from 'hooks/useInputSpeedTest/useInputSpeedTest';
import { useSelector, useDispatch } from 'react-redux';
import { getGameSettings } from 'store/selectors/gameSettings.selector';
import { FireFunctions } from 'fb';
import { updateGameScores } from 'store/actions/gameScore.actions';

export interface UpdateReachedCursorProviderProps {
  render: () => ReactElement;
  inputState: UseInputSpeedTestReturnApi;
  roomId: string;
}

export const ControlPointReachedProvider: FC<UpdateReachedCursorProviderProps> = ({
  inputState: { cursor, accuracy },
  roomId,
  render,
}) => {
  const dispatch = useDispatch();
  const { cursorsStamps } = useSelector(getGameSettings);

  useEffect(() => {
    if (!cursorsStamps || !cursor) return;
    const index = cursorsStamps.findIndex(
      cursorPosition => cursorPosition === cursor,
    );
    if (index !== -1) {
      const updateCursor = async () => {
        const {
          data: { scores },
        } = await FireFunctions.init().callPointReached(
          roomId,
          accuracy,
        );
        dispatch(updateGameScores(scores));
      };
      updateCursor();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor, cursorsStamps, dispatch, roomId]);

  return render();
};
