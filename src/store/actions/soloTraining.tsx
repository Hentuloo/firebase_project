import { BaseSoloTrainingState } from 'store/reducers/soloTraining';
import { Db } from 'fb';
import { Dispatch } from 'redux';
import { types } from './types';

export type SoloTrainingActions = FetchSoloTrainingSnap;

export interface FetchSoloTrainingSnap {
  type: types.SET_SOLO_TRAINING_STATE;
  payload: BaseSoloTrainingState;
}

export const getSoloTrainingSnap = (uid: string) => async (
  dispatch: Dispatch,
) => {
  const snap = await Db.init()
    .userSoloTrainingRef(uid)
    .get();
  const data = snap.data();
  dispatch({
    type: types.SET_SOLO_TRAINING_STATE,
    payload: data,
  } as FetchSoloTrainingSnap);
};
