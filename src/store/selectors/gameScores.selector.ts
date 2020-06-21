import { StoreType } from 'store/store';
import { GameScoreForStats } from 'types/GameScore';
import { createSelector } from 'reselect';
import { getGameSettings } from './gameSettings.selector';

export const getGameScores = (store: StoreType) => store.gameScore;

export const getGameScoresByRegisteredUsers = createSelector(
  getGameSettings,
  getGameScores,
  ({ registeredUsers }, gameScore): GameScoreForStats[] => {
    return Object.keys(registeredUsers).map(playerId => {
      const {
        wpmSpeed = 0,
        accuracy = 100,
        points = 0,
        progress = 0,
        difference = 0,
      } = gameScore[playerId] || {};

      return {
        displayName: registeredUsers[playerId].displayName,
        uid: playerId,
        wpmSpeed,
        accuracy,
        points,
        progress,
        difference,
      };
    });
  },
);
