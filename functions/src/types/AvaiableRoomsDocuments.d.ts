export interface AvaiableRoomDocument {
  /**
   * Max players numbers in room
   */
  playersNumber: number;
  /**
   * Room title
   */
  name: string;
  /**
   * Room password flag (is there a password in this room)
   */
  password?: boolean;
  /**
   * Room created time
   */
  created: number;
}
export type UpdateAvaiableRoomDocument = Partial<
  AvaiableRoomDocument
>;

interface AvaiableRoomsCollection {
  /**
   * Rooms without password
   */
  open: {
    [generatedKey: string]: AvaiableRoomDocument;
  };
  /**
   * Rooms with password
   */
  secured: {
    [generatedKey: string]: AvaiableRoomDocument;
  };
}
export type UpdateAvaiableRoomsCollection = Partial<
  AvaiableRoomsCollection
>;
