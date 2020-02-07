import React from 'react';
import ReactDOM from 'react-dom';
import store from 'store/store';
import { Provider as ReduxProvider } from 'react-redux';
import { listenAuthChanges } from 'store/actions/user';
import Root from './pages/Root';

store.dispatch(listenAuthChanges());

ReactDOM.render(
  <ReduxProvider store={store}>
    <Root />
  </ReduxProvider>,
  document.getElementById('root'),
);
