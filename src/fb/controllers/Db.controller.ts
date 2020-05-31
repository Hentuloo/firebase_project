import {
  updateAvaiableRooms,
  updateActiveRoom,
} from 'store/actions/rooms.actions';

import store from 'store/store';
import { defaultUser, defaultUserSolo } from 'fb/default';
import { Snap } from 'store/reducers/soloTraining.reducer';
import dayjs from 'dayjs';
import firebase from '../index';
import { collectionsWithId } from './helpers';

type FirestoreType = firebase.firestore.Firestore;

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

    const created = dayjs().format();
    const createdFormated = dayjs(created).format('MM-DD-YYYY');

    const defaultSoloTraining = { ...defaultUserSolo };
    defaultSoloTraining.snaps[0].data = createdFormated;

    const userRef = await user.get();
    if (userRef.exists) {
      return userRef;
    }

    await user.set({ ...defaultUser, created, ...additionalProps });
    await userTraining.set(defaultSoloTraining);

    return userRef;
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

  public getSoloTrainingData = async (uid: string) => {
    const snap = await this.userSoloTrainingRef(uid).get();
    return snap.data();
  };

  public addSnap = (uid: string, snap: Snap) =>
    this.userSoloTrainingRef(uid).update({
      snaps: firebase.firestore.FieldValue.arrayUnion(snap),
    });

  public increaseLevel = (uid: string) =>
    this.userSoloTrainingRef(uid).update({
      level: firebase.firestore.FieldValue.increment(1),
    });
}
