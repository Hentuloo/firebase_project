import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import LoginPage from 'pages/LoginPage/LoginPage';

import UserDetailsPage from 'pages/UserDetailsPage';
import MainPage from 'pages/MainPage';

import { withUser, redirectWhenUserLogged } from 'hoc/withUser';

function Root() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={withUser(MainPage)} />
        <Route
          path="/user-details"
          component={withUser(UserDetailsPage)}
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
