import { Action, types } from 'store/actions/types';
import { Snap } from 'store/actions/soloTraining';

const init = {
  snaps: [],
};

export interface SoloTraining {
  snaps: Snap[];
}

export default (
  state: SoloTraining = init,
  action: Action,
): SoloTraining => {
  switch (action.type) {
    case types.UPDATE_SNAPS: {
      return {
        ...state,
        snaps: [...state.snaps, action.payload],
      };
    }
    default:
      return state;
  }
};
