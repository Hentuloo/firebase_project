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
   * Start game time
   */
  startTimestamp: number | null;
  /**
   * End game time
   */
  endTimestamp: number | null;
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
   * After game end 'usersByScores' will represent the !!!
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
