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
export interface GameScoreWithUid extends GameScore {
  uid: string;
}

export interface GameScorebyUsers {
  [uid: string]: GameScore;
}
export interface GameScoreWithDifference extends GameScore {
  /**
   * points difference to the best player
   * or if the user is first, the difference to the second player
   */
  difference: number;
}
export interface GameScoreForStats {
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
  /**
   * User display name
   */
  displayName: string;
  /**
   * User id
   */
  uid: string;
  /**
   * points difference to the best player
   * or if the user is first, the difference to the second player
   */
  difference: number;
}
