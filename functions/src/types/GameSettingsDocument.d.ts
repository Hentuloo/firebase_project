import { GameScore } from './GameScorresDocument';

/**
 * firestoreDocument, general game settings
 */
export interface GameSettingsDoc {
  /**
   * Joined players to room data
   */
  registeredUsers: {
    [uid: string]: {
      displayName: string;
      photoURL: string;
      wins: number;
    };
  };
  /**
   * Text for mesurment
   * added after gameStart function
   */
  text: string | null;
  /**
   * Start game time
   * added after gameStart function
   */
  startTimestamp: number | null;
  /**
   * End game time
   *  added after gameStart function
   */
  endTimestamp: number | null;
  /**
   * controll points
   * added after gameStart function
   */
  cursorPoints: number[] | null;
  /**
   * Title of room
   */
  title: string;
  /**
   * Max players number
   */
  maxPlayersNumber: number;
  /**
   * Room password,
   * when there is not password is false
   */
  password: string | false;
  /**
   * Id of user who created the room
   */
  creator: string;
  /**
   * time when room was created
   */
  created: number;
  /**
   * After game end 'usersByScores' will represent the order of results
   */
  usersByScores: ScoreWithUid[] | null;
}
export type UpdateGameSettingsDoc = Partial<GameSettingsDoc>;

export interface ScoreWithUid extends GameScore {
  /**
   * User id
   */
  uid: string;
}
