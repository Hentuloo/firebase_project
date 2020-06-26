export type OnlineStates = 'online' | 'offline';

export interface UserDocument {
  created: number;
  displayName: string;
  photoURL: string;
  online: OnlineStates;
  onlineInApp: OnlineStates;
  wins: number;
  lastChanged?: number;
  cloudTaskUserExitApplication?: string;
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
    [uid: string]: {
      displayName: string;
      photoURL: string;
      wins: number;
    };
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

export interface TextForMesurementDoc {
  text: string;
  cursorPoints: any[];
  writtenWordsByInterval: number[];
  timeForWrite: number;
}
export type UpdateTextForMesurementDoc = Partial<
  TextForMesurementDoc
>;

export interface GeneralStateUsers {
  online: number;
}
export type UpdateGeneralStateUsers = Partial<GeneralStateUsers>;
export interface GeneralStateCollection {
  users: GeneralStateUsers;
}
export type UpdateGeneralStateCollection = Partial<
  GeneralStateCollection
>;
