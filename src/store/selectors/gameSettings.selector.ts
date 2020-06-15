import { createSelector } from 'reselect';
import { StoreType } from 'store/store';
import { GameSettingsState } from 'store/reducers/gameSettings.reducer';

export const getGameSettings = (store: StoreType) =>
  store.gameSettings;

export const getRegisteredUserInArray = createSelector(
  getGameSettings,
  ({ registeredUsers }: GameSettingsState) => {
    return Object.keys(registeredUsers).map(playerId => ({
      ...registeredUsers[playerId],
      uid: playerId,
    }));
  },
);
export const getGameStatusRequestFlag = createSelector(
  getGameSettings,
  ({ gameStartRequest }: GameSettingsState) => gameStartRequest,
);
export const getGameStartTimestamp = createSelector(
  getGameSettings,
  ({ startTimestamp }: GameSettingsState) => startTimestamp,
);
