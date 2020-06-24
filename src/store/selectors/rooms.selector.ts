import { StoreType } from 'store/store';
import { createSelector } from 'reselect';

export const getRooms = (store: StoreType) => store.rooms;

export const getLinkToStoredRoom = createSelector(
  getRooms,
  ({ activeRoomId }) => activeRoomId,
);
