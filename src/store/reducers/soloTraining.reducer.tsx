import { Action, types } from 'store/actions/types';

const init = {
  fetched: false,
  level: null,
  snaps: [],
};

export type Snap = {
  time: number;
  accuracy: number;
  speed: number;
  date: string;
};

export interface BaseSoloTrainingState {
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
    case types.ADD_SNAP: {
      return { ...state, snaps: [...state.snaps, action.payload] };
    }
    case types.INCREASE_LEVEL: {
      const { level } = state;
      if (!level) return state;
      return { ...state, level: level + 1 };
    }
    default:
      return state;
  }
};
