import React from 'react';
import ReactDOM from 'react-dom';
import store from 'store/store';
import { Provider as ReduxProvider } from 'react-redux';
import { listenAuthChanges } from 'store/actions/auth';
import App from './App';

store.dispatch(listenAuthChanges());

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById('root'),
);
