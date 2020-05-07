import { RoomsActions } from './rooms';
import { UserActions } from './user';
import { SoloTrainingActions } from './soloTraining';

export enum types {
  USER_NOT_LOGGED,
  UPDATE_PROFILE,
  UPDATE_AVAIABLE_ROOMS,
  JOIN_ROOM_WITHOUT_PASS,
  UPDATE_ACTIVE_ROOM,
  DELETE_ACTIVE_ROOM_DATA,

  // SOLO TRAINING
  UPDATE_SNAPS,
}

export type Action = RoomsActions | UserActions | SoloTrainingActions;
