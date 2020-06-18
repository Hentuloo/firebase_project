import { GameScorebyUsers } from 'types/GameScore';
import { types } from './types';

export type GameScoresActions = UpdateGameScoreAction;

interface UpdateGameScoreAction {
  type: types.UPDATE_GAME_SCORES;
  payload: GameScorebyUsers;
}
export const updateGameScores = (
  st: GameScorebyUsers,
): UpdateGameScoreAction => ({
  type: types.UPDATE_GAME_SCORES,
  payload: st,
});
