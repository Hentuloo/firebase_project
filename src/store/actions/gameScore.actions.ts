import { GameScoreState } from 'store/reducers/gameScores.reducer';
import { types } from './types';

export type GameScoresActions = UpdateGameScoreAction;

interface UpdateGameScoreAction {
  type: types.UPDATE_GAME_SCORES;
  payload: GameScoreState;
}
export const updateGameSettings = (
  st: GameScoreState,
): UpdateGameScoreAction => ({
  type: types.UPDATE_GAME_SCORES,
  payload: st,
});
