import {
  updateAvaiableRooms,
  updateActiveRoom,
} from 'store/actions/rooms';

import store from 'store/store';
import { defaultUser, defaultUserSolo } from 'fb/default';
import firebase from '../index';
import { collectionsWithId } from './helpers';

type FirestoreType = firebase.firestore.Firestore;
type Snap = firebase.firestore.DocumentSnapshot;

export class Db {
  instance: FirestoreType;

  roomsRef = () => {
    return this.collection(`rooms`);
  };

  userProfileRef = (uid: string) => {
    return this.doc(`users/${uid}`);
  };

  userSoloTrainingRef = (uid: string) => {
    return this.doc(`users-solo/${uid}`);
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
    const userSnap = await this.userProfileRef(uid).get();
    return { uid, ...userSnap.data() };
  };

  public createNewRoom = (uid: string, title: string) =>
    this.roomsRef().add({ creator: uid, title, users: [] });

  public listenRoom = (roomId: string): any => {
    return this.doc(`rooms/${roomId}`).onSnapshot(({ data }) => {
      store.dispatch(updateActiveRoom(data()));
    });
  };

  public newUser = async (uid: string, additionalProps: any) => {
    const user = Db.init().userProfileRef(uid);
    const userTraining = Db.init().userSoloTrainingRef(uid);

    await user.set({ ...defaultUser, ...additionalProps });
    await userTraining.set({ ...defaultUserSolo });

    return user;
  };

  public updateUser = async (uid: string, additionalProps: any) => {
    const user = Db.init().userProfileRef(uid);
    const userSnap = await user.get();

    if (userSnap.exists) return user;
    await user.set({ ...defaultUser, ...additionalProps });

    return user;
  };

  public subscribeUserProfile = (uid: string, callback: any) =>
    this.userProfileRef(uid).onSnapshot(callback);

  public updateUserDoc = (uid: string, newFields: any) =>
    this.userProfileRef(uid).update(newFields);

  // public addUserSnaps = async (uid: string, snap: Snap) => {
  //   await this.userProfileRef(uid)
  //     .collection('soloTraining/snaps')
  //     .update(newFields);

  //   throw new Error(err);
  // };
}
