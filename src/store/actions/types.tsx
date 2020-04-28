import { RoomsActions } from './rooms';
import { UserActions } from './user';

export enum types {
  USER_NOT_LOGGED,
  UPDATE_PROFILE,
  UPDATE_AVAIABLE_ROOMS,
  JOIN_ROOM_WITHOUT_PASS,
  UPDATE_ACTIVE_ROOM,
  DELETE_ACTIVE_ROOM_DATA,
}

export type Action = RoomsActions | UserActions;
