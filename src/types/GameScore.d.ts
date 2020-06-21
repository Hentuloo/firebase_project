export interface GameScore {
  changes: number;
  cursor: number;
  lastChangesDate: null | number;
  wpmSpeed: number;
  accuracy: number;
  points: number;
  progress: number;
}
export interface GameScoreWithUid extends GameScore {
  uid: string;
}

export interface GameScorebyUsers {
  [uid: string]: GameScore;
}
export interface GameScoreWithDifference extends GameScore {
  difference: number;
}
export interface GameScoreForStats {
  wpmSpeed: number;
  accuracy: number;
  points: number;
  progress: number;
  displayName: string;
  uid: string;
  difference: number;
}
