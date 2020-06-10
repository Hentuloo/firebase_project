import { AvaiableRoomInterface } from 'types/RoomsController';
import { types, Action } from '../actions/types';

const init = {
  avaiableRooms: [],
  activeRoomId: '',
};

export interface RoomsReducerState {
  avaiableRooms: AvaiableRoomInterface[];
  activeRoomId: string | null;
}

export default (
  state: RoomsReducerState = init,
  action: Action,
): RoomsReducerState => {
  switch (action.type) {
    case types.UPDATE_AVAIABLE_ROOMS:
      return { ...state, avaiableRooms: action.payload };
    case types.CLEAR_ROOM_FROM_AVAIABLE:
      return {
        ...state,
        avaiableRooms: state.avaiableRooms.filter(
          ({ gameKey }) => gameKey !== action.payload,
        ),
      };
    case types.JOIN_ROOM_WITHOUT_PASS:
      return { ...state, activeRoomId: action.payload };
    default:
      return state;
  }
};
