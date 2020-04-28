import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Constants } from 'config/Constants';
import { StoreType } from 'store/store';

export const useStoredRoom = () => {
  const activeRoomId = useSelector(
    ({ rooms }: StoreType) => rooms.activeRoomId,
  );
  const history = useHistory();

  const redirect = useCallback(() => {
    history.push(`${Constants.paths.room.path}/${activeRoomId}`);
  }, [activeRoomId]);

  return [activeRoomId, redirect];
};
