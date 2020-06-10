import { GameSettingsState } from 'store/reducers/gameSettings.reducer';
import { types } from './types';

export type GameSettnigsActions = UpdateGameSettingsAction;

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
