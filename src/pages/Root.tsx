import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import LoginPage from 'pages/LoginPage/LoginPage';
import NewRoomPage from 'pages/NewRoomPage/NewRoomPage';
import RegisteredPage from 'pages/RegisteredPage/RegisteredPage';

import { withUser, redirectWhenUserLogged } from 'hoc/withUser';
import { saveRoomPath } from 'hoc/saveRoomPath';
import { Constants } from 'config/Constants';
import { FixedBrandLogo } from 'components/atoms/FixedBrandLogo';

const SettingsPage = lazy(() =>
  import('pages/SettingsPage/SettingsPage'),
);
const LandingPage = lazy(() =>
  import('pages/LandingPage/LandingPage'),
);
const MainPage = lazy(() => import('pages/MainPage/MainPage'));
const JoinRoomPage = lazy(() =>
  import('pages/JoinRoomPage/JoinRoomPage'),
);
const SoloTraining = lazy(() =>
  import('pages/SoloTraining/SoloTraining'),
);
const RoomPage = lazy(() => import('pages/RoomPage/RoomPage'));

function Root() {
  return (
    <Router>
      <Suspense fallback={<FixedBrandLogo />}>
        <Switch>
          <Route
            exact
            path={Constants.paths.root.path}
            component={withUser(MainPage, LandingPage)}
          />
          <Route
            exact
            path={Constants.paths.dashboard.path}
            component={withUser(MainPage)}
          />
          <Route
            path={Constants.paths.solo.path}
            component={withUser(SoloTraining)}
          />
          <Route
            path={Constants.paths.settings.path}
            component={withUser(SettingsPage)}
          />
          <Route
            path={`${Constants.paths.newRoom.path}`}
            component={withUser(NewRoomPage)}
          />
          <Route
            path={`${Constants.paths.joinRoom.path}/:roomId/:title/:withPassword?`}
            component={saveRoomPath(withUser(JoinRoomPage))}
          />
          <Route
            path={`${Constants.paths.room.path}/:roomId`}
            component={withUser(RoomPage)}
          />
          <Route
            path={Constants.paths.login.path}
            component={redirectWhenUserLogged(LoginPage)}
          />
          <Route
            path={Constants.paths.createAccount.path}
            component={redirectWhenUserLogged(
              LoginPage,
              RegisteredPage,
              {
                createAccountPage: true,
              },
            )}
          />
          <Route
            path={Constants.paths.registered.path}
            component={withUser(RegisteredPage)}
          />
          <Route component={withUser(MainPage, LandingPage)} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default Root;
