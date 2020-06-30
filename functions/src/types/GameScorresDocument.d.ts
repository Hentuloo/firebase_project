/**
 * Scores for particural users
 */
export interface GameScore {
  /**
   * reached controll points number
   */
  changes: number;
  /**
   * active cursor point
   */
  cursor: number;
  /**
   * time of last reached point
   */
  lastChangesDate: null | number;
  /**
   * words per minute counter
   */
  wpmSpeed: number;
  /**
   * accurancy number
   */
  accuracy: number;
  /**
   * User reached points counter
   * (progress + (accuracy - 85) * 1.5).toFixed(2)
   */
  points: number;
  /**
   * progress number
   */
  progress: number;
}
export type UpdateGameScore = Partial<GameScore>;

/**
 * firestoreDocument, game scores document,
 */
export interface GameScoresDoc {
  /**
   * users scores by uid
   */
  scores: {
    [uid: string]: GameScore;
  };
  /**
   * Controll points
   */
  cursorPoints: number[] | null;
  /**
   * info about, how many words was written in particular controll point
   */
  writtenWordsByCursorsPoints: number[] | null;
  /**
   * Game start time
   */
  startTimestamp: number | null;
  /**
   * scheduled cloud task name,
   * this will call gameEnd function when geme end timestamp reached
   */
  stopGameFunction?: string;
}
export type UpdateGameScoresDoc = Partial<GameScoresDoc>;
