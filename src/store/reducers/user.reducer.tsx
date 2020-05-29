import {
  getStoragedDarkModeTheme,
  setStoragedDarkModeTheme,
} from 'utils/storageHelpers';
import { types, Action } from '../actions/types';

export type DarkMode = 'LIGHT' | 'DARK';
export interface UserReducerState {
  loggedRequest: boolean;
  uid: string | null;
  displayName: string | null;
  photoURL: string | null;
  darkMode: DarkMode;
}

const init: UserReducerState = {
  loggedRequest: true,
  uid: null,
  displayName: null,
  photoURL: null,
  darkMode: getStoragedDarkModeTheme() || 'LIGHT',
};

export default (
  state: UserReducerState = init,
  action: Action,
): UserReducerState => {
  switch (action.type) {
    case types.USER_NOT_LOGGED:
      return { ...init, loggedRequest: false };
    case types.UPDATE_PROFILE:
      return { ...state, ...action.payload, loggedRequest: false };
    case types.TOGGLE_DARK_MODE: {
      const newDarkMode =
        state.darkMode === 'LIGHT' ? 'DARK' : 'LIGHT';
      setStoragedDarkModeTheme(newDarkMode);
      return {
        ...state,
        darkMode: newDarkMode,
      };
    }
    default:
      return state;
  }
};
