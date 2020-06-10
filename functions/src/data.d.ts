export interface UserDocument {
  created: string;
  displayName: string;
  photoURL: string;
  lastCreatedRoom?: string;
}
export interface RoomDocument {
  players: {
    [uid: string]: { displayName: string; photoURL: string };
  };
  scores: {
    [uid: string]: {
      cursor: number;
      wrongLength: number;
      goodLength: number;
    };
  };
  creator: string;
  title: string;
  maxPlayersNumber: number;
  password: string;
  startTime: string;
}
interface RoomsCollection {
  rooms: {
    open: {
      [generatedKey: string]: {
        players: [string, string];
        max: number;
        name: string;
        gameKey: string; // remove by function
      };
    };

    secured: {
      [generatedKey: string]: {
        players: [string, string];
        max: number;
        name: string;
        password: string; // remove by function
        gameKey: string; // remove by function
      };
    };
  };
}
export interface GameSettingsDoc {
  registeredUsers: {
    [uid: string]: { displayName: string; photoURL: string };
  };
  textId: string;
  changesLength: number;
  startTimestamp: number | null;
  endTimestamp: number | null;
  cursorsStamps: number[];
  password: string;
  maxPlayersNumber: number;
}
export interface GameScoresDoc {
  scores: {
    [uid: string]: {
      changes: number;
      timestamp: string;
      cursor: number;
      wrongLength: number;
      goodLength: number;
    };
  };
}
/*
1. admin create new room
2. fb function make new documents
  +roomDocument
  +gameScoreDocument
  +gameSettingsDocument
3. user get respond with game id
4. rest players come to play
  all players subscribe (gameSettingsDocument)
5. admin click "start game"
6. fb function generate text, generate start time and change gameSettingsDocument
7. all subscribed users gets data and visible time to start
8. when user reached some cursorStamps
9.  make request fb function (functionUpdateScore) with gameId, cursor, good, bad
10. fb function read gameScoreDocument and check:
  is user logged
  when user doesn't exist in usersQueue => ban
  when timestamp is largest than 400wpm => ban
  when user reached game end => change gameSettingsDocument
11. if everythink is ok add changes and respond new values (calculate difference)
*/
