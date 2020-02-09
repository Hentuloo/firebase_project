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
import { Constants } from 'config/Constants';

function Root() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path={Constants.paths.root.path}
          component={withUser(MainPage)}
        />
        <Route
          path={Constants.paths.settings.path}
          component={withUser(SettingsPage)}
        />
        <Route
          path={Constants.paths.login.path}
          component={redirectWhenUserLogged(LoginPage)}
        />
      </Switch>
    </Router>
  );
}

export default Root;
