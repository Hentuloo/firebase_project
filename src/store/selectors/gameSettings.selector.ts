import { createSelector } from 'reselect';
import { StoreType } from 'store/store';
import { arrayMoveElement } from 'utils';
import { UserLabelInfo } from 'types/GameSettings';

export const getGameSettings = (store: StoreType) =>
  store.gameSettings;

export const getRegisteredUserInArray = createSelector(
  getGameSettings,
  ({ registeredUsers, creator }): UserLabelInfo[] => {
    const users = Object.keys(registeredUsers).map(playerId => ({
      ...registeredUsers[playerId],
      uid: playerId,
      isCreator: creator === playerId,
    }));
    const creatorIndex = users.findIndex(
      ({ isCreator }) => isCreator === true,
    );
    if (creatorIndex === -1 || creatorIndex === 0) return users;
    return arrayMoveElement(users, creatorIndex, 0);
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

export const getLastScoresUpdateFlag = createSelector(
  getGameSettings,
  ({ waitForLastScoresUpdate }) => waitForLastScoresUpdate,
);
export const getFinalResults = createSelector(
  getGameSettings,
  ({ usersByScores }) => usersByScores,
);
export const getRoomCreator = createSelector(
  getGameSettings,
  ({ creator }) => creator,
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
