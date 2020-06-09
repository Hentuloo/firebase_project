import { GameSettings } from 'types/GameSettings';
import { types, Action } from '../actions/types';

export type GameSettingsState = GameSettings;

const init: GameSettingsState = {
  registeredUsers: {},
  textId: null,
  changesLength: null,
  startTimestamp: null,
  endTimestamp: null,
  cursorsStamps: null,
  maxPlayersNumber: null,
};

export default (state = init, action: Action): GameSettingsState => {
  switch (action.type) {
    case types.UPDATE_GAME_SETTINGS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
