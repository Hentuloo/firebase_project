import { StoreType } from 'store/store';

export const getRooms = (store: StoreType) => store.rooms;
export const getActiveRoom = (store: StoreType) =>
  getRooms(store).activeRoom;
