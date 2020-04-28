import {
  updateAvaiableRooms,
  updateActiveRoom,
} from 'store/actions/rooms';
import store from 'store/store';
import { firestore } from '../firestore';
import firebase from '../index';
import { collectionWithId } from '../utils';

export const listenRooms = () => {
  return firestore.collection('rooms').onSnapshot(roomsSnap => {
    const rooms = collectionWithId(roomsSnap);
    store.dispatch(updateAvaiableRooms(rooms));
    return null;
  });
};

export const createNewRoom = (uid: string, title: string) => {
  return firestore
    .collection(`rooms`)
    .add({ creator: uid, title, users: [] });
};

export const joinToOpenRoom = async (roomId: string) => {
  const joinFunc = firebase
    .functions()
    .httpsCallable('joinToOpenRoom');
  const res = await joinFunc({ roomId });
  return res;
};
export const leaveRoom = async (roomId: string) => {
  const laveFunc = firebase
    .functions()
    .httpsCallable('leaveFromOpenRoom');
  await laveFunc({ roomId });
};

export const listenRoom = (roomId: string): any => {
  return firestore.doc(`rooms/${roomId}`).onSnapshot(roomSnapshot => {
    store.dispatch(updateActiveRoom(roomSnapshot.data()));
    return null;
  });
};
