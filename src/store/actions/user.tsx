import { Dispatch } from 'redux';
import { Auth, Db } from 'fb';
import { types } from './types';

export type UserActions =
  | UpadateUserProfileAction
  | UserIsNotLoggedAction;

interface UpadateUserProfileAction {
  type: types.UPDATE_PROFILE;
  payload: {
    uid: string;
    displayName: string;
    photoURL?: string;
  };
}
export const listenUserProfile = (
  uid: string,
  dispatch: Dispatch,
) => {
  const onSnapChange = (snapshot: any) => {
    if (snapshot.exists) {
      const { displayName, photoURL } = snapshot.data();
      dispatch({
        type: types.UPDATE_PROFILE,
        payload: { uid, displayName, photoURL },
      } as UpadateUserProfileAction);
    }
  };

  return Db.init().subscribeUserProfile(uid, onSnapChange);
};

interface UserIsNotLoggedAction {
  type: types.USER_NOT_LOGGED;
}
export const listenAuthChanges = () => (dispatch: Dispatch) => {
  let unSubscribeUserProfile: any = null;

  Auth.init().subscribeAuthChanges(async (user: any) => {
    if (user) {
      unSubscribeUserProfile = listenUserProfile(user.uid, dispatch);
    } else {
      dispatch({
        type: types.USER_NOT_LOGGED,
      });
      if (unSubscribeUserProfile) {
        unSubscribeUserProfile();
      }
    }
  });
};
