import { RoomsActions } from './rooms';
import { UserActions } from './user';
import { SoloTrainingActions } from './soloTraining';

export type Action = RoomsActions | UserActions | SoloTrainingActions;

export enum types {
  USER_NOT_LOGGED = 'USER_NOT_LOGGED',
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  UPDATE_AVAIABLE_ROOMS = 'UPDATE_AVAIABLE_ROOMS',
  JOIN_ROOM_WITHOUT_PASS = 'JOIN_ROOM_WITHOUT_PASS',
  UPDATE_ACTIVE_ROOM = 'UPDATE_ACTIVE_ROOM',
  DELETE_ACTIVE_ROOM_DATA = 'DELETE_ACTIVE_ROOM_DATA',

  // SOLO TRAINING
  UPDATE_SNAPS = 'UPDATE_SNAPS',
  SET_SOLO_TRAINING_STATE = 'SET_SOLO_TRAINING_STATE',
}
