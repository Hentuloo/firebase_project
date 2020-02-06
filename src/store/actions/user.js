import { subscribeAuthChanges } from 'fb/auth';

import { subscribeUserProfile } from 'fb/firestore';
import {
  USER_LOGGED,
  USER_NOT_LOGGED,
  UPDATE_PROFILE,
} from './types';

export const listenUserProfile = (uid, dispatch) => {
  const onSnapChange = snapshot => {
    if (snapshot.exists) {
      dispatch({ type: UPDATE_PROFILE, payload: snapshot.data() });
    }
  };
  return subscribeUserProfile(uid, onSnapChange);
};

export const listenAuthChanges = () => dispatch => {
  let unSubscribeUserProfile = null;
  subscribeAuthChanges(async user => {
    if (user) {
      dispatch({
        type: USER_LOGGED,
        payload: user,
      });
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
