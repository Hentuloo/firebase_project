import { GameSettingsWithPasswordFlag } from 'types/GameSettings';
import { types, Action } from '../actions/types';

export interface GameSettingsState
  extends GameSettingsWithPasswordFlag {
  timesOfLightChanges:
    | [number, number, number, number, number]
    | null;
  gameAlreadyStated: boolean;
  gameStartRequest: boolean;
}

// const exampleState: GameSettingsState = {
//   registeredUsers: {
//     lsX6j7m33cdSZ0mfnZbQb0ttEwk1: {
//       displayName: 'szysza',
//       photoURL: undefined,
//     },
//     I6pTXpwq0GQGFMqNhTITiSckzDF2: {
//       photoURL:
//         'https://lh3.googleusercontent.com/a-/AOh14GgG4PBQzVabVfUBAYTZxLhlEe0A4H1x3iDceB6Bhw',
//       displayName: 'Kamil Chędkowski',
//     },
//   },
//   changesLength: null,
//   startTimestamp: 1592154839.903,
//   endTimestamp: 1592154899.903,
//   cursorsStamps: [10, 22, 34],
//   maxPlayersNumber: 2,
//   creator: 'I6pTXpwq0GQGFMqNhTITiSckzDF2',
//   title: 'sdfgsd',
//   withPassword: false,
//   created: 1592154558155,
//   text:
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla arcu diam, mollis eu lectus et, dignissim egestas odio.',
//   timesOfLightChanges: [1000, 3000, 5000, 7000, 7400],
// };

const init: GameSettingsState = {
  registeredUsers: {},
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla arcu diam, mollis eu lectus et, dignissim egestas odio.',
  changesLength: null,
  startTimestamp: null,
  endTimestamp: null,
  cursorsStamps: [],
  maxPlayersNumber: 0,
  creator: '',
  title: 'my fancy room',
  withPassword: false,
  created: new Date().getDate(),
  timesOfLightChanges: null,
  gameAlreadyStated: false,
  gameStartRequest: false,
};

export default (state = init, action: Action): GameSettingsState => {
  switch (action.type) {
    case types.UPDATE_GAME_SETTINGS:
      if (
        state.startTimestamp === null &&
        action.payload.startTimestamp !== null
      ) {
        const timeToStart =
          action.payload.startTimestamp * 1000 - new Date().getTime();
        // game started Before
        if (timeToStart < 0) {
          return {
            ...state,
            ...action.payload,
            gameStartRequest: false,
            gameAlreadyStated: true,
          };
        }
        return {
          ...state,
          ...action.payload,
          gameStartRequest: false,
          timesOfLightChanges: [
            0,
            timeToStart * 0.55,
            timeToStart * 0.75,
            timeToStart * 0.95,
            timeToStart,
          ],
        };
      }
      return { ...state, ...action.payload, gameStartRequest: false };
    case types.SET_GAME_START_REQUEST: {
      return { ...state, gameStartRequest: action.payload };
    }
    default:
      return state;
  }
};
