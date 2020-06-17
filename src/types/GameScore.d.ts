export interface GameScore {
  changes: number;
  cursor: number;
  lastChangesDate: null | number;
  wpmSpeed: number;
  accurancy: number;
  points: number;
  progress: number;
}
export interface GameScoreWithUserData {
  displayName: string;
  wpmSpeed: number;
  accurancy: number;
  points: number;
  progress: number;
  uid: string;
}
