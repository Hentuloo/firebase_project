import {
  UPDATE_AVAIABLE_ROOMS,
  JOIN_ROOM_WITHOUT_PASS,
  UPDATE_ACTIVE_ROOM,
} from './types';

export const updateAvaiableRooms = rooms => dispatch => {
  dispatch({
    type: UPDATE_AVAIABLE_ROOMS,
    payload: rooms,
  });
};

export const joinRoom = roomId => dispatch => {
  dispatch({
    type: JOIN_ROOM_WITHOUT_PASS,
    payload: roomId,
  });
};

export const updateActiveRoom = data => dispatch => {
  dispatch({
    type: UPDATE_ACTIVE_ROOM,
    payload: data,
  });
};
