import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Constants } from 'config/Constants';
import { StoreType } from 'store/store';

export const withUser = <
  P extends object = object,
  O extends object = object
>(
  WrapperedComponent: React.ComponentType<P>,
  OtherPage?: React.ComponentType<O>,
) => {
  return (props: any) => {
    const { loggedRequest, uid } = useSelector(
      (state: StoreType) => state.user,
    );

    if (loggedRequest) return null;
    if (uid) return <WrapperedComponent {...props} />;
    if (OtherPage) return <OtherPage {...props} />;
    return <Redirect to={Constants.paths.login.path} />;
  };
};

export const redirectWhenUserLogged = <
  P extends object = object,
  O extends object = object
>(
  WrapperedComponent: React.ComponentType<P>,
  OtherPage?: React.ComponentType<O>,
) => {
  return (props: any) => {
    const { loggedRequest, uid } = useSelector(
      (state: StoreType) => state.user,
    );

    if (loggedRequest) return null;
    if (!uid) return <WrapperedComponent {...props} />;
    if (OtherPage) return <OtherPage {...props} />;
    return <Redirect to={Constants.paths.dashboard.path} />;
  };
};
