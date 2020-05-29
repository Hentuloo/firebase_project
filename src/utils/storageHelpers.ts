import { Constants } from 'config/Constants';
import { DarkMode } from 'store/reducers/user.reducer';

export const getStoragedDarkModeTheme = () =>
  window.localStorage.getItem(
    Constants.localStorage.darkMode,
  ) as DarkMode | null;
export const setStoragedDarkModeTheme = (value: DarkMode) =>
  window.localStorage.setItem(Constants.localStorage.darkMode, value);
