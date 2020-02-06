import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import LoginPage from 'pages/LoginPage/LoginPage';
import UserDetails from 'pages/UserDetails';

import { withUser } from 'hoc/withUser';

function App() {
  return (
    <Router>
      <Switch>
        <Route exec path="/" component={withUser(UserDetails)} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default App;
