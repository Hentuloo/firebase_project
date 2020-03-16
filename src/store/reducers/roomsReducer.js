import {
  UPDATE_AVAIABLE_ROOMS,
  JOIN_ROOM_WITHOUT_PASS,
  UPDATE_ACTIVE_ROOM,
  DELETE_ACTIVE_ROOM_DATA,
} from '../actions/types';

const init = {
  avaiableRooms: [],
  activeRoomId: 'sth',
  activeRoom: {
    users: [],
  },
};

export default (state = init, action) => {
  switch (action.type) {
    case UPDATE_AVAIABLE_ROOMS:
      return { ...state, avaiableRooms: action.payload };
    case JOIN_ROOM_WITHOUT_PASS:
      return { ...state, activeRoomId: action.payload };
    case UPDATE_ACTIVE_ROOM:
      return { ...state, activeRoom: action.payload };
    case DELETE_ACTIVE_ROOM_DATA:
      return {
        ...state,
        activeRoomId: null,
        activeRoom: {
          users: [],
        },
      };
    default:
      return state;
  }
};
