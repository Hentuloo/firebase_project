import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Constants } from 'config/Constants';

export const useStoredRoom = () => {
  const activeRoomId = useSelector(({ rooms }) => rooms.activeRoomId);
  const history = useHistory();

  const redirect = useCallback(() => {
    history.push(`${Constants.paths.room.path}/${activeRoomId}`);
  }, [activeRoomId]);

  return [activeRoomId, redirect];
};
