import { GameScoresDoc, ScoreWithUid } from '../data';

export const sortUsersScores = (scores: GameScoresDoc) => {
  const users = Object.keys(scores.scores);
  const scoresWithUsers = users.map(
    uid => ({ ...scores.scores[uid], uid } as ScoreWithUid),
  );
  return scoresWithUsers.sort(
    (first, second) => second.points - first.points,
  );
};
