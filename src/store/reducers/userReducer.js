import {
  USER_LOGGED,
  USER_NOT_LOGGED,
  UPDATE_PROFILE,
} from '../actions/types';

const init = {
  loggedRequest: true,
  uid: null,
  displayName: null,
  photoURL: null,
};

export default (state = init, action) => {
  switch (action.type) {
    case USER_LOGGED:
      return { ...state, uid: action.payload, loggedRequest: false };
    case USER_NOT_LOGGED:
      return { ...init, loggedRequest: false };
    case UPDATE_PROFILE:
      return { ...state, ...action.payload, loggedRequest: false };
    default:
      return state;
  }
};
