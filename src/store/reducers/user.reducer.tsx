import { types, Action } from '../actions/types';

const init = {
  loggedRequest: true,
  uid: null,
  displayName: null,
  photoURL: null,
};

export interface UserReducerState {
  loggedRequest: boolean;
  uid: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export default (
  state: UserReducerState = init,
  action: Action,
): UserReducerState => {
  switch (action.type) {
    case types.USER_NOT_LOGGED:
      return { ...init, loggedRequest: false };
    case types.UPDATE_PROFILE:
      return { ...state, ...action.payload, loggedRequest: false };
    default:
      return state;
  }
};
