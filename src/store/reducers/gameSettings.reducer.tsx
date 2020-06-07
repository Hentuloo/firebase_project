import { types, Action } from '../actions/types';

export interface GameSettingsState {
  registeredUsers: {
    [uid: string]: { displayName: string; photoURL: string };
  };
  textId: string | null;
  changesLength: number | null;
  startTimestamp: number | null;
  endTimestamp: number | null;
  cursorsStamps: number[] | null;
  password: string | null;
  maxPlayersNumber: number | null;
}

const init: GameSettingsState = {
  registeredUsers: {},
  textId: null,
  changesLength: null,
  startTimestamp: null,
  endTimestamp: null,
  cursorsStamps: null,
  password: null,
  maxPlayersNumber: null,
};

export default (
  state: GameSettingsState = init,
  action: Action,
): GameSettingsState => {
  switch (action.type) {
    case types.UPDATE_GAME_SETTINGS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
