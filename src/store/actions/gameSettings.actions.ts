import { GameSettingsState } from 'store/reducers/gameSettings.reducer';
import { types } from './types';

export type GameSettnigsActions =
  | UpdateGameSettingsAction
  | SetGameStartRequestAction
  | ClearGameSettingsAction
  | ToggleScoresModalAction
  | ShowGameScoresAction;

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
interface ShowGameScoresAction {
  type: types.SHOW_GAME_SCORES;
  payload: GameSettingsState;
}
export const showGameScores = (
  st: GameSettingsState,
): ShowGameScoresAction => ({
  type: types.SHOW_GAME_SCORES,
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
interface ToggleScoresModalAction {
  type: types.TOGGLE_SCORES_MODAL;
}
export const toggleScoresModal = (): ToggleScoresModalAction => ({
  type: types.TOGGLE_SCORES_MODAL,
});
