import { types } from './types';

export type RoomsActions = UpdateAvaiableRoomsAction | JoinRoomAction;

interface UpdateAvaiableRoomsAction {
  type: types.UPDATE_AVAIABLE_ROOMS;
  payload: any[];
}
export const updateAvaiableRooms = (
  rooms: any[],
): UpdateAvaiableRoomsAction => ({
  type: types.UPDATE_AVAIABLE_ROOMS,
  payload: rooms,
});

interface JoinRoomAction {
  type: types.JOIN_ROOM_WITHOUT_PASS;
  payload: string;
}
export const joinRoom = (roomId: string): JoinRoomAction => ({
  type: types.JOIN_ROOM_WITHOUT_PASS,
  payload: roomId,
});
