import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const withUser = WrapperedComponent => {
  return props => {
    const { loggedRequest, uid } = useSelector(state => state.user);

    if (loggedRequest) return <WrapperedComponent {...props} />;
    if (uid) return <WrapperedComponent {...props} />;
    return <Redirect to="/login" />;
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
