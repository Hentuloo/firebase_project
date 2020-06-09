export interface GameSettings {
  registeredUsers: {
    [uid: string]: { displayName: string; photoURL: string };
  };
  textId: string | null;
  changesLength: number | null;
  startTimestamp: number | null;
  endTimestamp: number | null;
  cursorsStamps: number[] | null;
  maxPlayersNumber: number | null;
}
export interface GameSettingsWithPassword extends GameSettings {
  password: string | boolean;
}
