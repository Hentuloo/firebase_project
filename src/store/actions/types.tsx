import { RoomsActions } from './rooms.actions';
import { UserActions } from './user.actions';
import { SoloTrainingActions } from './soloTraining.actions';
import { GameSettnigsActions } from './gameSettings.actions';
import { GameScoresActions } from './gameScore.actions';

export type Action =
  | RoomsActions
  | UserActions
  | SoloTrainingActions
  | GameSettnigsActions
  | GameScoresActions;

export enum types {
  USER_NOT_LOGGED = 'USER_NOT_LOGGED',
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE',

  // SOLO TRAINING
  ADD_SNAP = 'ADD_SNAP',
  SET_SOLO_TRAINING_STATE = 'SET_SOLO_TRAINING_STATE',
  INCREASE_LEVEL = 'INCREASE_LEVEL',

  // GAME SETTINGS
  UPDATE_GAME_SETTINGS = 'UPDATE_GAME_SETTINGS',
  SET_GAME_START_REQUEST = 'SET_GAME_START_REQUEST',
  CLEAR_GAME_SETTINGS = 'CLEAR_GAME_SETTINGS',
  TOGGLE_SCORES_MODAL = 'TOGGLE_SCORES_MODAL',
  SHOW_GAME_SCORES = 'SHOW_GAME_SCORES',
  LAST_SCORES_UPDATE = 'LAST_SCORES_UPDATE',
  SET_GAME_ALREADY_STARTED = 'SET_GAME_ALREADY_STARTED',
  SET_GAME_BEFORE_START = 'SET_GAME_BEFORE_START',

  // ROOMS
  UPDATE_AVAIABLE_ROOMS = 'UPDATE_AVAIABLE_ROOMS',
  JOIN_ROOM_WITHOUT_PASS = 'JOIN_ROOM_WITHOUT_PASS',
  CLEAR_ROOM_FROM_AVAIABLE = 'CLEAR_ROOM_FROM_AVAIABLE',

  // GAME SCORES
  UPDATE_GAME_SCORES = 'UPDATE_GAME_SCORES',
}
