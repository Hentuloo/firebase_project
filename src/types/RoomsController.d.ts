export interface AvaiableRoomInterface {
  /**
   * Max players numbers in room
   */
  playersNumber: number;
  /**
   * Room title
   */
  title: string;
  /**
   * Room password flag (is there a password in this room)
   */
  password?: boolean;
  /**
   * Room created time
   */
  created: number;
  /**
   * game id
   */
  gameKey: string;
}
