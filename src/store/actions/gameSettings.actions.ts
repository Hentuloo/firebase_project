import { GameSettingsState } from 'store/reducers/gameSettings.reducer';
import { types } from './types';

export type GameSettnigsActions =
  | UpdateGameSettingsAction
  | SetGameStartRequestAction
  | ClearGameSettingsAction;

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
interface SetGameStartRequestAction {
  type: types.SET_GAME_START_REQUEST;
  payload: boolean;
}
export const gameStartRequest = (
  flag: boolean,
): SetGameStartRequestAction => ({
  type: types.SET_GAME_START_REQUEST,
  payload: flag,
});
interface ClearGameSettingsAction {
  type: types.CLEAR_GAME_SETTINGS;
}
export const clearGameSettings = (): ClearGameSettingsAction => ({
  type: types.CLEAR_GAME_SETTINGS,
});
