import { GameSettingsWithPasswordFlag } from 'types/GameSettings';
import { types, Action } from '../actions/types';

export type GameSettingsState = GameSettingsWithPasswordFlag;

const init: GameSettingsState = {
  registeredUsers: {},
  textId: null,
  changesLength: null,
  startTimestamp: null,
  endTimestamp: null,
  cursorsStamps: [],
  maxPlayersNumber: 0,
  creator: '',
  title: 'my fancy room',
  withPassword: false,
  created: '',
};

export default (state = init, action: Action): GameSettingsState => {
  switch (action.type) {
    case types.UPDATE_GAME_SETTINGS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
