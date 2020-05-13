import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import store from 'store/store';
import { Provider as ReduxProvider } from 'react-redux';
import { listenAuthChanges } from 'store/actions/user.actions';

// Styled-components
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'themes/GlobalStyles';
import theme from 'themes/mainTheme';

// Other
import { ToastContainer } from 'react-toastify';
import 'config/config';
import Root from './pages/Root';

// @ts-ignore
store.dispatch(listenAuthChanges());

ReactDOM.render(
  <ReduxProvider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Root />
      <ToastContainer />
    </ThemeProvider>
  </ReduxProvider>,
  document.getElementById('root'),
);
