import { GameSettingsState } from 'store/reducers/gameSettings.reducer';
import { types } from './types';

export type GameSettnigsActions =
  | UpdateGameSettingsAction
  | SetGameStartRequest;

interface UpdateGameSettingsAction {
  type: types.UPDATE_GAME_SETTINGS;
  payload: GameSettingsState;
}
export const updateGameSettings = (
  st: GameSettingsState,
): UpdateGameSettingsAction => ({
  type: types.UPDATE_GAME_SETTINGS,
  payload: st,
});
interface SetGameStartRequest {
  type: types.SET_GAME_START_REQUEST;
  payload: boolean;
}
export const gameStartRequest = (
  flag: boolean,
): SetGameStartRequest => ({
  type: types.SET_GAME_START_REQUEST,
  payload: flag,
});
