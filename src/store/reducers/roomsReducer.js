import {
  UPDATE_AVAIABLE_ROOMS,
  JOIN_ROOM_WITHOUT_PASS,
  UPDATE_ACTIVE_ROOM,
} from '../actions/types';

const init = {
  avaiableRooms: [],
  activeRoomId: null,
  activeRoom: {},
};

export default (state = init, action) => {
  switch (action.type) {
    case UPDATE_AVAIABLE_ROOMS:
      return { ...state, avaiableRooms: action.payload };
    case JOIN_ROOM_WITHOUT_PASS:
      return { ...state, activeRoomId: action.payload };
    case UPDATE_ACTIVE_ROOM:
      return { ...state, activeRoom: action.payload };
    default:
      return state;
  }
};
