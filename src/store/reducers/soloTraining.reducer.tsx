import { Action, types } from 'store/actions/types';

const init = {
  fetched: false,
  avaiableWord: null,
  level: null,
  snaps: [],
};

export type Snap = {
  time: number;
  accuracy: number;
  speed: number;
};

export interface BaseSoloTrainingState {
  avaiableWord: number | null;
  level: number | null;
  snaps: Snap[];
}
export interface SoloTrainingState extends BaseSoloTrainingState {
  fetched: boolean;
}

export default (
  state: SoloTrainingState = init,
  action: Action,
): SoloTrainingState => {
  switch (action.type) {
    case types.SET_SOLO_TRAINING_STATE: {
      return { ...state, ...action.payload, fetched: true };
    }
    default:
      return state;
  }
};
