import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from 'pages/LoginPage/LoginPage';

export const withUser = WrapperedComponent => {
  return props => {
    const { loggedRequest, uid } = useSelector(state => state.user);

    if (loggedRequest) return <WrapperedComponent {...props} />;
    if (uid) return <WrapperedComponent {...props} />;
    return <LoginPage />;
  };
};

export const redirectWhenUserLogged = WrapperedComponent => {
  return props => {
    const { loggedRequest, uid } = useSelector(state => state.user);

    if (loggedRequest) return null;
    if (!uid) return <WrapperedComponent {...props} />;
    return <Redirect to="/" />;
  };
};
