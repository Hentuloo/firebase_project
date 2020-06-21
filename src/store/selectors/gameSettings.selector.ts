import { createSelector } from 'reselect';
import { StoreType } from 'store/store';

export const getGameSettings = (store: StoreType) =>
  store.gameSettings;

export const getRegisteredUserInArray = createSelector(
  getGameSettings,
  ({ registeredUsers }) => {
    return Object.keys(registeredUsers).map(playerId => ({
      ...registeredUsers[playerId],
      uid: playerId,
    }));
  },
);
export const getGameStatusRequestFlag = createSelector(
  getGameSettings,
  ({ gameStartRequest }) => gameStartRequest,
);
export const getGameStartTimestamp = createSelector(
  getGameSettings,
  ({ startTimestamp }) => startTimestamp,
);
export const getFinalResultsWithUserImages = createSelector(
  getGameSettings,
  ({ usersByScores, registeredUsers }) => {
    if (!usersByScores) return null;
    return usersByScores.map(({ uid, ...rest }) => ({
      ...registeredUsers[uid],
      ...rest,
    }));
  },
);
export const getScoresModalFlag = createSelector(
  getGameSettings,
  ({ scoresModal }) => scoresModal,
);
