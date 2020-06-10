import { StoreType } from 'store/store';

export const getGameSettings = (store: StoreType) =>
  store.gameSettings;

export const getRegisteredUserInArray = (store: StoreType) => {
  const { registeredUsers } = getGameSettings(store);
  return Object.keys(registeredUsers).map(playerId => ({
    ...registeredUsers[playerId],
    uid: playerId,
  }));
};
