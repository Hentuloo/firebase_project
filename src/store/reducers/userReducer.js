import { USER_LOGGED, USER_NOT_LOGGED } from '../actions/types';

const init = {
  loggedRequest: true,
  uid: null,
  displayName: null,
  photoURL: null,
};

export default (state = init, action) => {
  switch (action.type) {
    case USER_LOGGED:
      return { ...state, ...action.payload, loggedRequest: false };
    case USER_NOT_LOGGED:
      return { ...init, loggedRequest: false };
    default:
      return state;
  }
};
