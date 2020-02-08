import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import LoginPage from 'pages/LoginPage/LoginPage';

import SettingsPage from 'pages/SettingsPage/SettingsPage';
import MainPage from 'pages/MainPage';

import { withUser, redirectWhenUserLogged } from 'hoc/withUser';

function Root() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={withUser(MainPage)} />
        <Route
          path="/user-details"
          component={withUser(SettingsPage)}
        />
        <Route
          path="/login"
          component={redirectWhenUserLogged(LoginPage)}
        />
      </Switch>
    </Router>
  );
}

export default Root;
