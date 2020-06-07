import { RoomsActions } from './rooms.actions';
import { UserActions } from './user.actions';
import { SoloTrainingActions } from './soloTraining.actions';
import { GameSettnigsActions } from './gameSettings.actions';

export type Action =
  | RoomsActions
  | UserActions
  | SoloTrainingActions
  | GameSettnigsActions;

export enum types {
  USER_NOT_LOGGED = 'USER_NOT_LOGGED',
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  UPDATE_AVAIABLE_ROOMS = 'UPDATE_AVAIABLE_ROOMS',
  JOIN_ROOM_WITHOUT_PASS = 'JOIN_ROOM_WITHOUT_PASS',
  TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE',

  // SOLO TRAINING
  ADD_SNAP = 'ADD_SNAP',
  SET_SOLO_TRAINING_STATE = 'SET_SOLO_TRAINING_STATE',
  INCREASE_LEVEL = 'INCREASE_LEVEL',

  // GAME SETTINGS
  UPDATE_GAME_SETTINGS = 'UPDATE_GAME_SETTINGS',
}
