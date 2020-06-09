import { GameSettings } from 'types/GameSettings';
import { types } from './types';

export type GameSettnigsActions = UpdateGameSettingsAction;

interface UpdateGameSettingsAction {
  type: types.UPDATE_GAME_SETTINGS;
  payload: GameSettings;
}
export const updateGameSettings = (
  st: GameSettings,
): UpdateGameSettingsAction => ({
  type: types.UPDATE_GAME_SETTINGS,
  payload: st,
});
