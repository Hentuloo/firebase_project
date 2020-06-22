export interface UserDocument {
  created: string;
  displayName: string;
  photoURL: string;
  state: string;
  lastChanged: number;
  cloudTaskDeleteRelatedRoom?: string;
  lastCreatedRoom?: string;
  lastJoinedRoom?: string;
}
export type UpdateUserDocument = Partial<UserDocument>;

export interface AvaiableRoomDocument {
  players: [string, string];
  max: number;
  name: string;
  password?: string; // remove by function
  gameKey: string; // remove by function
  created: number;
}
export type UpdateAvaiableRoomDocument = Partial<
  AvaiableRoomDocument
>;

interface AvaiableRoomsCollection {
  open: {
    [generatedKey: string]: AvaiableRoomDocument;
  };
  secured: {
    [generatedKey: string]: AvaiableRoomDocument;
  };
}
export type UpdateAvaiableRoomsCollection = Partial<
  AvaiableRoomsCollection
>;

export interface GameSettingsDoc {
  registeredUsers: {
    [uid: string]: { displayName: string; photoURL: string };
  };
  textId: string;
  changesLength: number;
  startTimestamp: number | null;
  endTimestamp: number | null;
  password: string;
  maxPlayersNumber: number;
  creator: string;
  usersByScores: ScoreWithUid[] | null;
}
export type UpdateGameSettingsDoc = Partial<GameSettingsDoc>;

export interface GameScore {
  changes: number;
  cursor: number;
  lastChangesDate: null | number;
  wpmSpeed: number;
  accuracy: number;
  points: number;
  progress: number;
}
export type UpdateGameScore = Partial<GameScore>;

export interface ScoreWithUid extends GameScore {
  uid: string;
}

export interface GameScoresDoc {
  scores: {
    [uid: string]: GameScore;
  };
  cursorPoints: number[] | null;
  writtenWordsByCursorsPoints: number[] | null;
  startTimestamp: number | null;
  stopGameFunction?: string;
}
export type UpdateGameScoresDoc = Partial<GameScoresDoc>;
