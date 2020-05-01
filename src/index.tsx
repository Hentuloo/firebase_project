import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import store from 'store/store';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'themes/GlobalStyles';
import theme from 'themes/mainTheme';
import { listenAuthChanges } from 'store/actions/user';
// gsap and draggable
import gsap from 'gsap';
import { Draggable } from 'gsap/all';

import Root from './pages/Root';

gsap.registerPlugin(Draggable);

// @ts-ignore
store.dispatch(listenAuthChanges());

ReactDOM.render(
  <ReduxProvider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Root />
    </ThemeProvider>
  </ReduxProvider>,
  document.getElementById('root'),
);