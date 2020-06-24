import { types } from './types';

export type RoomsActions =
  | UpdateAvaiableRoomsAction
  | SetRoomUrlAction
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

interface SetRoomUrlAction {
  type: types.SET_ROOM_URL;
  payload: string | null;
}
export const setSavedRoomUrl = (
  roomId: string | null,
): SetRoomUrlAction => ({
  type: types.SET_ROOM_URL,
  payload: roomId,
});
