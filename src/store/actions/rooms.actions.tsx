import { types } from './types';

export type RoomsActions =
  | UpdateAvaiableRoomsAction
  | JoinRoomAction
  | UpdateActiveRoomAction
  | DeleteActiveRoomDataAction;

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

interface UpdateActiveRoomAction {
  type: types.UPDATE_ACTIVE_ROOM;
  payload: any;
}
export const updateActiveRoom = (
  data: any,
): UpdateActiveRoomAction => ({
  type: types.UPDATE_ACTIVE_ROOM,
  payload: data,
});

interface DeleteActiveRoomDataAction {
  type: types.DELETE_ACTIVE_ROOM_DATA;
}
export const deleteActiveRoomData = (): DeleteActiveRoomDataAction => ({
  type: types.DELETE_ACTIVE_ROOM_DATA,
});
