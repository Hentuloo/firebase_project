import { GameScoreWithUid } from './GameScore';

export interface UserBasicInfo {
  /**
   * User display name
   */
  displayName: string;
  /**
   * User wins number
   */
  wins: number;
  /**
   * User Photo/icon
   */
  photoURL?: string;
}
export interface UserLabelInfo {
  /**
   * User id
   */
  uid: string;
  /**
   * User display name
   */
  displayName: string;
  /**
   * User wins number
   */
  wins: number;
  /**
   * User Photo/icon
   */
  photoURL?: string;
  /**
   * true if user created the room
   */
  isCreator?: boolean;
}

export interface GameSettings {
  /**
   * Joined players to room data
   */
  registeredUsers: {
    [uid: string]: {
      displayName: string;
      photoURL?: string;
      wins: number;
    };
  };
  /**
   * Text for mesurment
   * added after gameStart
   */
  text: string | null;
  /**
   * Start game time
   * added after gameStart
   */
  startTimestamp: number | null;
  /**
   * End game time
   *  added after gameStart
   */
  endTimestamp: number | null;
  /**
   * controll points
   * added after gameStart
   */
  cursorPoints: number[] | null;
  /**
   * Max players number
   */
  maxPlayersNumber: number | null;
  /**
   * Id of user who created the room
   */
  creator: string;
  /**
   * Title of room
   */
  title: string;
  /**
   * time when room was created
   */
  created: number;
  /**
   * After game end 'usersByScores' will represent the order of results
   */
  usersByScores: GameScoreWithUid[] | null;
}
export interface GameSettingsWithPassword extends GameSettings {
  password: string | boolean;
}
export interface GameSettingsWithPasswordFlag extends GameSettings {
  withPassword: boolean;
}
