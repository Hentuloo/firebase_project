import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import store from 'store/store';
import { Provider as ReduxProvider } from 'react-redux';
import { listenAuthChanges } from 'store/actions/user.actions';

// Styled-components
import { WithStylesTheme } from 'hoc/WithStylesTheme';

// Other
import { ToastContainer } from 'react-toastify';
import 'tippy.js/dist/tippy.css';
import 'config/config';
import Root from './pages/Root';

// @ts-ignore
store.dispatch(listenAuthChanges());

ReactDOM.render(
  <ReduxProvider store={store}>
    <WithStylesTheme>
      <Root />
      <ToastContainer />
    </WithStylesTheme>
  </ReduxProvider>,
  document.getElementById('root'),
);
