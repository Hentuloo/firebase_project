import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { getDarkModeState } from 'store/selectors/user.selector';
import { ThemeProvider } from 'styled-components';

import theme from 'themes/mainTheme';
import GlobalStyles from 'themes/GlobalStyles';

export const WithStylesTheme = ({
  children,
}: {
  children: ReactNode;
}) => {
  const mode = useSelector(getDarkModeState);

  return (
    <ThemeProvider theme={theme[mode]}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};
