import { updateRooms } from 'store/actions/rooms';
import store from 'store/store';
import { firestore } from '../firestore';
import { collectionWithId } from '../utils';

export const listenRooms = () => {
  return firestore.collection('rooms').onSnapshot(roomsSnap => {
    if (roomsSnap.empty) return console.log('Nie ma pokoii');
    const rooms = collectionWithId(roomsSnap);
    store.dispatch(updateRooms(rooms));
    return null;
  });
};

export const createNewRoom = (uid, title, password) => {
  return firestore
    .collection(`rooms`)
    .add({ creator: uid, title, password });
};
