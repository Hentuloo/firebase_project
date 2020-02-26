import {
  updateAvaiableRooms,
  updateActiveRoom,
} from 'store/actions/rooms';
import store from 'store/store';
import { firestore } from '../firestore';
import { collectionWithId } from '../utils';

export const listenRooms = () => {
  return firestore.collection('rooms').onSnapshot(roomsSnap => {
    const rooms = collectionWithId(roomsSnap);
    store.dispatch(updateAvaiableRooms, updateAvaiableRooms(rooms));
    return null;
  });
};

export const createNewRoom = (uid, title) => {
  return firestore
    .collection(`rooms`)
    .add({ creator: uid, title, users: [] });
};

export const listenActiveRoom = async roomId => {
  const roomRef = firestore.doc(`rooms/${roomId}`);
  const roomSnap = await roomRef.get();
  if (!roomSnap.exists) {
    throw new Error('dont exist');
  }
  return roomRef.onSnapshot(roomSnapshot => {
    store.dispatch(updateActiveRoom(roomSnapshot.data()));
    return null;
  });
};
