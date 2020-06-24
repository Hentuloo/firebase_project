import { GeneralStateCollection } from 'types/GeneralState';
import { types, Action } from '../actions/types';

const init = {
  users: {
    online: 0,
  },
};

export interface GeneralStateReducer extends GeneralStateCollection {}

export default (
  state: GeneralStateReducer = init,
  action: Action,
): GeneralStateReducer => {
  switch (action.type) {
    case types.UPDATE_GENERAL_STATE_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};
