import { GameSettingsState } from 'store/reducers/gameSettings.reducer';
import { types } from './types';

export type GameSettnigsActions =
  | UpdateGameSettingsAction
  | SetGameStartRequestAction
  | ClearGameSettingsAction
  | ToggleScoresModalAction
  | ShowGameScoresAction
  | SetWaitingForLastScoresUpdateAction;

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
interface UpdateGameSettingsAction {
  type:
    | types.UPDATE_GAME_SETTINGS
    | types.SHOW_GAME_SCORES
    | types.SET_GAME_ALREADY_STARTED
    | types.SET_GAME_BEFORE_START;
  payload: GameSettingsState;
}
export const updateGameSettings = (
  settings: GameSettingsState,
): UpdateGameSettingsAction => {
  const { usersByScores, startTimestamp, endTimestamp } = settings;
  // game has scores
  if (usersByScores !== null)
    return {
      type: types.SHOW_GAME_SCORES,
      payload: settings,
    };

  // game never started before
  if (startTimestamp === null || endTimestamp === null)
    return {
      type: types.UPDATE_GAME_SETTINGS,
      payload: settings,
    };

  // game is before start or after
  const timeToStart = startTimestamp * 1000 - new Date().getTime();

  // game is after start time
  if (timeToStart < 0)
    return {
      type: types.SET_GAME_ALREADY_STARTED,
      payload: settings,
    };

  // game is before start time
  return {
    type: types.SET_GAME_BEFORE_START,
    payload: {
      ...settings,
      timesOfLightChanges: [
        0,
        timeToStart * 0.75,
        timeToStart * 0.85,
        timeToStart * 0.95,
        timeToStart,
      ],
    },
  };
};
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
interface SetWaitingForLastScoresUpdateAction {
  type: types.LAST_SCORES_UPDATE;
}
export const setWaitingForLastScoresUpdate = (): SetWaitingForLastScoresUpdateAction => ({
  type: types.LAST_SCORES_UPDATE,
});
