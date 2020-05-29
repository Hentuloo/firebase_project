import { StoreType } from 'store/store';

export const getUser = (store: StoreType) => store.user;

export const getDarkModeState = (store: StoreType) =>
  getUser(store).darkMode;
