import { GameScoreWithDifference } from 'types/GameScore';
import { sortByPointsDifference } from 'utils';
import { types, Action } from '../actions/types';

export interface GameScoreState {
  [uid: string]: GameScoreWithDifference;
}

const init: GameScoreState = {};

export default (state = init, action: Action): GameScoreState => {
  switch (action.type) {
    case types.UPDATE_GAME_SCORES: {
      const uids = Object.keys(action.payload);
      const points = uids.map(uid => action.payload[uid].points);
      const pointsDifferences = sortByPointsDifference(points);

      const newScoresState: GameScoreState = {};

      uids.forEach((uid, index) => {
        newScoresState[uid] = {
          ...action.payload[uid],
          difference: Number(pointsDifferences[index].toFixed(0)),
        };
      });

      return { ...state, ...newScoresState };
    }
    default:
      return state;
  }
};
