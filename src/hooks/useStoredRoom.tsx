import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Constants } from 'config/Constants';
import { getRooms } from 'store/selectors/rooms.selector';

export const useStoredRoom = () => {
  const { activeRoomId } = useSelector(getRooms);
  const history = useHistory();

  const redirect = useCallback(() => {
    history.push(`${Constants.paths.room.path}/${activeRoomId}`);
  }, [activeRoomId, history]);

  return [activeRoomId, redirect];
};
