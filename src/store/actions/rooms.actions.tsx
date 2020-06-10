import { types } from './types';

export type RoomsActions =
  | UpdateAvaiableRoomsAction
  | JoinRoomAction
  | ClearRoomFromAvaiableAction;

interface UpdateAvaiableRoomsAction {
  type: types.UPDATE_AVAIABLE_ROOMS;
  payload: any[];
}
export const updateAvaiableRoomsAction = (
  rooms: any[],
): UpdateAvaiableRoomsAction => ({
  type: types.UPDATE_AVAIABLE_ROOMS,
  payload: rooms,
});

interface ClearRoomFromAvaiableAction {
  type: types.CLEAR_ROOM_FROM_AVAIABLE;
  payload: string;
}
export const clearRoomFromAvaiable = (
  roomId: string,
): ClearRoomFromAvaiableAction => ({
  type: types.CLEAR_ROOM_FROM_AVAIABLE,
  payload: roomId,
});

interface JoinRoomAction {
  type: types.JOIN_ROOM_WITHOUT_PASS;
  payload: string;
}
export const joinRoom = (roomId: string): JoinRoomAction => ({
  type: types.JOIN_ROOM_WITHOUT_PASS,
  payload: roomId,
});
