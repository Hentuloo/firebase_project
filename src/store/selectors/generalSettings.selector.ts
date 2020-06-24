import { StoreType } from 'store/store';
import { createSelector } from 'reselect';

export const getGeneralState = (store: StoreType) =>
  store.generalState;

export const getOnlineUsersNumber = createSelector(
  getGeneralState,
  ({ users }): number => users.online,
);
