import { RoomsActions } from './rooms.actions';
import { UserActions } from './user.actions';
import { SoloTrainingActions } from './soloTraining.actions';

export type Action = RoomsActions | UserActions | SoloTrainingActions;

export enum types {
  USER_NOT_LOGGED = 'USER_NOT_LOGGED',
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  UPDATE_AVAIABLE_ROOMS = 'UPDATE_AVAIABLE_ROOMS',
  JOIN_ROOM_WITHOUT_PASS = 'JOIN_ROOM_WITHOUT_PASS',
  UPDATE_ACTIVE_ROOM = 'UPDATE_ACTIVE_ROOM',
  DELETE_ACTIVE_ROOM_DATA = 'DELETE_ACTIVE_ROOM_DATA',
  TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE',

  // SOLO TRAINING
  ADD_SNAP = 'ADD_SNAP',
  SET_SOLO_TRAINING_STATE = 'SET_SOLO_TRAINING_STATE',
  INCREASE_LEVEL = 'INCREASE_LEVEL',
}
