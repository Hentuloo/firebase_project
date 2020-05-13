import {
  BaseSoloTrainingState,
  Snap,
} from 'store/reducers/soloTraining.reducer';
import { Db } from 'fb';
import { Dispatch } from 'redux';
import { types } from './types';

export type SoloTrainingActions =
  | FetchSoloTrainingSnap
  | AddSnapAction;

export interface FetchSoloTrainingSnap {
  type: types.SET_SOLO_TRAINING_STATE;
  payload: BaseSoloTrainingState;
}

export const getSoloTrainingSnap = (uid: string) => async (
  dispatch: Dispatch,
) => {
  const data = await Db.init().getSoloTrainingData(uid);

  dispatch({
    type: types.SET_SOLO_TRAINING_STATE,
    payload: data,
  } as FetchSoloTrainingSnap);
};

export interface AddSnapAction {
  type: types.ADD_SNAP;
  payload: Snap;
}

export const addSnapAction = (uid: string, snap: Snap) => async (
  dispatch: Dispatch,
) => {
  try {
    await Db.init().addSnap(uid, snap);
    dispatch({
      type: types.ADD_SNAP,
      payload: snap,
    } as AddSnapAction);
  } catch (e) {
    throw new Error(e);
  }
};
