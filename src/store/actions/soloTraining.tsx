import { types } from './types';

export type SoloTrainingActions = UpadteSnapsAction;

export type Snap = {
  time: number;
  accuracy: number;
  speed: number;
};

export interface UpadteSnapsAction {
  type: types.UPDATE_SNAPS;
  payload: Snap;
}

export const updateSnaps = (snap: Snap): UpadteSnapsAction => ({
  type: types.UPDATE_SNAPS,
  payload: snap,
});
