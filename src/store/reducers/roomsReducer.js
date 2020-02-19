import { UPDATE_ROOMS, JOIN_ROOM } from '../actions/types';

const init = {
  avaiableRooms: [],
  activeRoomId: null,
};

export default (state = init, action) => {
  switch (action.type) {
    case UPDATE_ROOMS:
      return { ...state, avaiableRooms: action.payload };
    case JOIN_ROOM:
      return { ...state, avaiableRooms: action.payload };
    default:
      return state;
  }
};
