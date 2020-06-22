import { GameSettingsWithPasswordFlag } from 'types/GameSettings';
import { types, Action } from '../actions/types';

export interface GameSettingsState
  extends GameSettingsWithPasswordFlag {
  timesOfLightChanges:
    | [number, number, number, number, number]
    | null;
  gameAlreadyStated: boolean;
  gameStartRequest: boolean;
  scoresModal: boolean;
  waitForLastScoresUpdate: boolean;
}
// const tt = new Date().getTime() / 1000 + 10;
// const now = tt * 1000 - new Date().getTime();

// const exampleState: GameSettingsState = {
//   registeredUsers: {
//     lsX6j7m33cdSZ0mfnZbQb0ttEwk1: {
//       photoURL: '',
//       displayName: 'szysza',
//     },
//     I6pTXpwq0GQGFMqNhTITiSckzDF2: {
//       photoURL:
//         'https://lh3.googleusercontent.com/a-/AOh14GgG4PBQzVabVfUBAYTZxLhlEe0A4H1x3iDceB6Bhw',
//       displayName: 'Kamil Chędkowski',
//     },
//   },
//   text:
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla arcu diam, mollis eu lectus et, dignissim egestas odio.',
//   changesLength: null,
//   startTimestamp: 1592669260.473,
//   endTimestamp: 1592669300.473,
//   cursorPoints: [20, 40, 60, 80, 100, 118],
//   maxPlayersNumber: 2,
//   creator: 'I6pTXpwq0GQGFMqNhTITiSckzDF2',
//   title: 'dddddddd',
//   withPassword: false,
//   created: 1592669220256,
//   timesOfLightChanges: null,
//   gameAlreadyStated: false,
//   gameStartRequest: false,
//   scoresModal: true,
//   usersByScores: [
//     {
//       cursor: 100,
//       points: 104.26,
//       accuracy: 98.95,
//       lastChangesDate: 1592669275306,
//       changes: 5,
//       wpmSpeed: 101.13,
//       uid: 'lsX6j7m33cdSZ0mfnZbQb0ttEwk1',
//       progress: 83.33333333333334,
//     },
//     {
//       cursor: 80,
//       changes: 4,
//       lastChangesDate: 1592669299206,
//       wpmSpeed: 30.98,
//       points: 81.28,
//       uid: 'I6pTXpwq0GQGFMqNhTITiSckzDF2',
//       accuracy: 94.74,
//       progress: 66.66666666666666,
//     },
//   ],
// };
const init: GameSettingsState = {
  registeredUsers: {},
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla arcu diam, mollis eu lectus et, dignissim egestas odio.',
  changesLength: null,
  startTimestamp: null,
  endTimestamp: null,
  cursorPoints: [],
  maxPlayersNumber: 0,
  creator: '',
  title: 'my fancy room',
  withPassword: false,
  created: new Date().getDate(),
  timesOfLightChanges: null,
  gameAlreadyStated: false,
  gameStartRequest: false,
  scoresModal: false,
  waitForLastScoresUpdate: false,
  usersByScores: null,
};

export default (state = init, action: Action): GameSettingsState => {
  switch (action.type) {
    case types.SET_GAME_ALREADY_STARTED: {
      return {
        ...state,
        ...action.payload,
        gameStartRequest: false,
        gameAlreadyStated: true,
        scoresModal: false,
      };
    }
    case types.SET_GAME_BEFORE_START: {
      return {
        ...state,
        ...action.payload,
        gameStartRequest: false,
        scoresModal: false,
      };
    }
    case types.UPDATE_GAME_SETTINGS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case types.SET_GAME_START_REQUEST: {
      return { ...state, gameStartRequest: action.payload };
    }
    case types.TOGGLE_SCORES_MODAL: {
      return { ...state, scoresModal: !state.scoresModal };
    }
    case types.SHOW_GAME_SCORES: {
      return {
        ...state,
        ...action.payload,
        scoresModal: true,
        waitForLastScoresUpdate: false,
      };
    }
    case types.LAST_SCORES_UPDATE: {
      return {
        ...state,
        waitForLastScoresUpdate: true,
      };
    }
    case types.CLEAR_GAME_SETTINGS: {
      return {
        ...state,
        registeredUsers: {},
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla arcu diam, mollis eu lectus et, dignissim egestas odio.',
        changesLength: null,
        startTimestamp: null,
        endTimestamp: null,
        cursorPoints: [],
        maxPlayersNumber: 0,
        creator: '',
        title: 'my fancy room',
        withPassword: false,
        created: new Date().getDate(),
        timesOfLightChanges: null,
        gameAlreadyStated: false,
        gameStartRequest: false,
        scoresModal: false,
      };
    }
    default:
      return state;
  }
};
