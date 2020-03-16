import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Constants } from 'config/Constants';

export const withUser = (WrapperedComponent, OtherPage) => {
  return props => {
    const { loggedRequest, uid } = useSelector(state => state.user);

    if (loggedRequest) return null;
    if (uid) return <WrapperedComponent {...props} />;
    if (OtherPage) return <OtherPage {...props} />;
    return <Redirect to={Constants.paths.login.path} />;
  };
};

export const redirectWhenUserLogged = (
  WrapperedComponent,
  OtherPage,
) => {
  return props => {
    const { loggedRequest, uid } = useSelector(state => state.user);

    if (loggedRequest) return null;
    if (!uid) return <WrapperedComponent {...props} />;
    if (OtherPage) return <OtherPage {...props} />;
    return <Redirect to={Constants.paths.dashboard.path} />;
  };
};
