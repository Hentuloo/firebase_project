import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Constants } from 'config/Constants';
import { getUser } from 'store/selectors/user.selector';
import { Db } from 'fb';

export const withUser = <
  P extends object = object,
  O extends object = object
>(
  WrapperedComponent: React.ComponentType<P>,
  OtherPage?: React.ComponentType<O>,
  optionalProps?: { [key: string]: any },
) => {
  return (props: any) => {
    const { loggedRequest, uid } = useSelector(getUser);

    useEffect(() => {
      if (uid) {
        Db.init().listenConnectedInfo(uid);
      }
    }, [uid]);

    if (Constants.OFFLINE_MODE)
      return <WrapperedComponent {...props} {...optionalProps} />;
    if (loggedRequest) return null;
    if (uid)
      return <WrapperedComponent {...props} {...optionalProps} />;
    if (OtherPage) return <OtherPage {...props} {...optionalProps} />;
    return <Redirect to={Constants.paths.login.path} />;
  };
};

export const redirectWhenUserLogged = <
  P extends object = object,
  O extends object = object
>(
  WrapperedComponent: React.ComponentType<P>,
  OtherPage?: React.ComponentType<O>,
  optionalProps?: { [key: string]: any },
) => {
  return (props: any) => {
    const [checkedOnce, setCheckedOnce] = useState(false);
    const { loggedRequest, uid } = useSelector(getUser);

    useEffect(() => {
      // prevent redirect in future
      if (!loggedRequest && !uid) {
        setCheckedOnce(true);
      }
    }, [loggedRequest, uid]);

    if (Constants.OFFLINE_MODE)
      return <WrapperedComponent {...props} {...optionalProps} />;
    if (loggedRequest) return null;
    if (!uid || checkedOnce)
      return <WrapperedComponent {...props} {...optionalProps} />;
    if (OtherPage) return <OtherPage {...props} {...optionalProps} />;

    return <Redirect to={Constants.paths.dashboard.path} />;
  };
};
