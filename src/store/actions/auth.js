import { subscribeAuthChanges } from 'fb/auth';
import { getUserProfile } from 'fb/firestore';
import { USER_LOGGED, USER_NOT_LOGGED } from './types';

export const listenAuthChanges = () => dispatch => {
  subscribeAuthChanges(async user => {
    if (user) {
      const userProfile = await getUserProfile(user.uid);
      dispatch({
        type: USER_LOGGED,
        payload: userProfile,
      });
    } else {
      dispatch({
        type: USER_NOT_LOGGED,
      });
    }
  });
};
