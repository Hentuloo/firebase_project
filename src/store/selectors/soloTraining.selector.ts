import { StoreType } from 'store/store';
import { createSelector } from 'reselect';

export const getSoloTraining = (store: StoreType) =>
  store.soloTraining;

export const getSoloTrainingLevel = createSelector(
  getSoloTraining,
  ({ level }) => level,
);
