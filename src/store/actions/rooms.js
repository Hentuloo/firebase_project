import { UPDATE_ROOMS, JOIN_ROOM } from './types';

export const updateRooms = rooms => dispatch => {
  dispatch({
    type: UPDATE_ROOMS,
    payload: rooms,
  });
};

export const joinRoom = roomId => dispatch => {
  dispatch({
    type: JOIN_ROOM,
    payload: roomId,
  });
};
