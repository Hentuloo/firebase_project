import React from 'react';
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
