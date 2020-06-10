import { StoreType } from 'store/store';
import { GameScoreWithUserData } from 'types/GameScore';

export const getGameScores = (store: StoreType) => store.gameScore;

export const getGameScoresByRegisteredUsers = ({
  gameSettings: { registeredUsers },
  gameScore,
}: StoreType): GameScoreWithUserData[] => {
  return Object.keys(registeredUsers).map(playerId => {
    const {
      wpmSpeed = 0,
      accurancy = 100,
      points = 0,
      progress = 0,
    } = gameScore[playerId] || {};

    return {
      displayName: registeredUsers[playerId].displayName,
      uid: playerId,
      wpmSpeed,
      accurancy,
      points,
      progress,
    };
  });
};
