import { GameScoreWithUid } from './GameScore';

export interface UserBasicInfo {
  displayName: string;
  photoURL?: string;
}
export interface UserLabelInfo {
  uid: string;
  displayName: string;
  photoURL?: string;
  isCreator?: boolean;
}

export interface GameSettings {
  registeredUsers: {
    [uid: string]: { displayName: string; photoURL?: string };
  };
  text: string | null;
  changesLength: number | null;
  startTimestamp: number | null;
  endTimestamp: number | null;
  cursorPoints: number[] | null;
  maxPlayersNumber: number | null;
  creator: string;
  title: string;
  created: number;
  usersByScores: GameScoreWithUid[] | null;
}
export interface GameSettingsWithPassword extends GameSettings {
  password: string | boolean;
}
export interface GameSettingsWithPasswordFlag extends GameSettings {
  withPassword: boolean;
}
