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
    case types.SET_GAME_BEFORE_START: {
      const { registeredUsers } = action.payload;
      const usersUids = Object.keys(registeredUsers);
      const usersWithClearScores = usersUids.reduce((acc, uid) => {
        acc[uid] = {
          lastChangesDate: 0,
          cursor: 0,
          wpmSpeed: 0,
          changes: 0,
          points: 0,
          accuracy: 100,
          progress: 0,
          difference: 0,
        };
        return acc;
      }, {});

      return {
        ...usersWithClearScores,
      };
    }
    default:
      return state;
  }
};
