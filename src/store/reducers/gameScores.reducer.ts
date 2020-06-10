import { GameScore } from 'types/GameScore';
import { types, Action } from '../actions/types';

export interface GameScoreState {
  [uid: string]: GameScore;
}

const init: GameScoreState = {};

export default (state = init, action: Action): GameScoreState => {
  switch (action.type) {
    case types.UPDATE_GAME_SCORES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
