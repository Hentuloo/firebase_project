import { DarkMode } from 'store/reducers/user.reducer';
import colors, { ThemeColor } from './colors';

const coreTheme = {
  mediaQuery: {
    xs: '@media (min-width: 0px)',
    sm: '@media (min-width: 480px)',
    md: '@media (min-width: 768px)',
    lg: '@media (min-width: 1024px)',
    vlg: '@media (min-width: 1494px)',
    mobileKeyboard: ` @media screen and (min-device-aspect-ratio: 1/1) and (min-aspect-ratio: 1/1) and (max-width: 768px)`,
    isMobil: 768,
  },
  ff: ["'Open Sans', sans-serif", "'PT Mono', monospace"],
  fs: {
    mini: '0.5em',
    xxxs: '0.7em',
    xxs: '0.9em',
    xs: '1.1em',
    s: '1.3em',
    m: '1.5em',
    l: '1.6em',
    xl: '1.8em',
    xxl: '2em',
    xxxl: '2.3em',
    large: '2.8em',
  },
  fw: [400, 600],
};

type ThemeCore = typeof coreTheme;

export interface ThemeType extends ThemeColor, ThemeCore {}
export type ThemeTypeWithDarkMode = {
  [key in DarkMode]: ThemeType;
};
const theme: ThemeTypeWithDarkMode = {
  DARK: { ...coreTheme, ...colors.dark },
  LIGHT: { ...coreTheme, ...colors.light },
};
export default theme;
