import {
  updateAvaiableRooms,
  updateActiveRoom,
} from 'store/actions/rooms';
import store from 'store/store';
import firebase from '../index';
import { collectionsWithId } from './helpers';

type FirestoreType = firebase.firestore.Firestore;
type Snap = firebase.firestore.DocumentSnapshot;

export class Db {
  instance: FirestoreType;

  roomsRef = () => {
    return this.collection(`rooms`);
  };

  userRef = (uid: string) => {
    return this.doc(`users/${uid}`);
  };

  static init = () => {
    return new Db();
  };

  constructor(firestore?: FirestoreType) {
    this.instance = firestore || firebase.firestore();
  }

  public collection = (collectionName: string) =>
    this.instance.collection(collectionName);

  public doc = (documentName: string) =>
    this.instance.doc(documentName);

  public listenRooms = () => {
    return this.roomsRef().onSnapshot(roomsSnap => {
      const rooms = collectionsWithId(roomsSnap);
      store.dispatch(updateAvaiableRooms(rooms));
      return null;
    });
  };

  public getUserProfile = async (uid: string) => {
    const userSnap = await this.userRef(uid).get();
    return { uid, ...userSnap.data() };
  };

  public createNewRoom = (uid: string, title: string) =>
    this.roomsRef().add({ creator: uid, title, users: [] });

  public listenRoom = (roomId: string): any => {
    return this.doc(`rooms/${roomId}`).onSnapshot(({ data }) => {
      store.dispatch(updateActiveRoom(data()));
    });
  };

  public subscribeUserProfile = (uid: string, callback: any) =>
    this.userRef(uid).onSnapshot(callback);

  public updateUserDoc = async (uid: string, newFields: any) => {
    try {
      await this.userRef(uid).update(newFields);
    } catch (err) {
      throw new Error(err);
    }
  };
}
