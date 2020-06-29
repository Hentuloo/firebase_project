import { GameSettingsWithPasswordFlag } from 'types/GameSettings';
import { auth } from 'firebase';
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

const init: GameSettingsState = {
  registeredUsers: {},
  text: null,
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
      const user = auth().currentUser;
      const { usersByScores } = action.payload;
      const userHaveResultFlag =
        usersByScores &&
        user &&
        usersByScores.some(({ uid }) => uid === user.uid);
      return {
        ...state,
        ...action.payload,
        scoresModal: !!userHaveResultFlag,
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
        text: null,
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
