import React from 'react';
import ReactDOM from 'react-dom';
import store from 'store/store';
import { Provider as ReduxProvider } from 'react-redux';
import App from './App';

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById('root'),
);
