import { subscribeAuthChanges } from 'fb/controllers/auth';

import { subscribeUserProfile } from 'fb/controllers/userProfile';
import { USER_NOT_LOGGED, UPDATE_PROFILE } from './types';

export const listenUserProfile = (uid, dispatch) => {
  const onSnapChange = snapshot => {
    if (snapshot.exists) {
      const { displayName, photoURL } = snapshot.data();
      dispatch({
        type: UPDATE_PROFILE,
        payload: { uid, displayName, photoURL },
      });
    }
  };
  return subscribeUserProfile(uid, onSnapChange);
};

export const listenAuthChanges = () => dispatch => {
  let unSubscribeUserProfile = null;
  subscribeAuthChanges(async user => {
    if (user) {
      unSubscribeUserProfile = listenUserProfile(user.uid, dispatch);
    } else {
      dispatch({
        type: USER_NOT_LOGGED,
      });
      if (unSubscribeUserProfile) {
        unSubscribeUserProfile();
      }
    }
  });
};
