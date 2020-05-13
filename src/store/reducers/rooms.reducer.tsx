import { types, Action } from '../actions/types';

const init = {
  avaiableRooms: [],
  activeRoomId: 'sth',
  activeRoom: {
    users: [],
  },
};

export interface RoomsReducerState {
  avaiableRooms: any[];
  activeRoomId: string | null;
  activeRoom: {
    users: any[];
  };
}

export default (
  state: RoomsReducerState = init,
  action: Action,
): RoomsReducerState => {
  switch (action.type) {
    case types.UPDATE_AVAIABLE_ROOMS:
      return { ...state, avaiableRooms: action.payload };
    case types.JOIN_ROOM_WITHOUT_PASS:
      return { ...state, activeRoomId: action.payload };
    case types.UPDATE_ACTIVE_ROOM:
      return { ...state, activeRoom: action.payload };
    case types.DELETE_ACTIVE_ROOM_DATA:
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
