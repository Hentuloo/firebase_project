import store from 'store/store';
import { defaultUser, defaultUserSolo } from 'fb/default';
import { Snap } from 'store/reducers/soloTraining.reducer';
import dayjs from 'dayjs';
import {
  updateGameSettings,
  showGameScores,
} from 'store/actions/gameSettings.actions';
import { GameSettingsWithPassword } from 'types/GameSettings';
import { GameSettingsState } from 'store/reducers/gameSettings.reducer';
import { Constants } from 'config/Constants';
import firebase from '../index';

type FirestoreType = firebase.firestore.Firestore;

export class Db {
  instance: FirestoreType;

  roomsRef = () => {
    return this.collection(`rooms`);
  };

  gameSettingsRef = () => {
    return this.collection(`games`);
  };

  userProfileRef = (uid: string) => {
    return this.doc(`users/${uid}`);
  };

  userSoloTrainingRef = (uid: string) => {
    return this.doc(`usersSolo/${uid}`);
  };

  userStatusRef = (uid: string) => {
    return firebase.firestore().doc(`/users/${uid}`);
  };

  userDatabaseStatusRef = (uid: string) => {
    return firebase.database().ref(`/status/${uid}`);
  };

  userDatabaseConnectedInfosRef = () => {
    return firebase.database().ref('.info/connected');
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

  public listenGameSettings = (
    roomId: string,
    onErr?: (e: Error) => void,
  ) => {
    return this.gameSettingsRef()
      .doc(roomId)
      .onSnapshot(async gameSettingsSnap => {
        const {
          password,
          ...settingsWithoutPassword
        } = gameSettingsSnap.data() as GameSettingsWithPassword;
        if (settingsWithoutPassword) {
          if (settingsWithoutPassword.usersByScores) {
            return store.dispatch(
              showGameScores({
                withPassword: !!password,
                ...settingsWithoutPassword,
              } as GameSettingsState),
            );
          }
          return store.dispatch(
            updateGameSettings({
              withPassword: !!password,
              ...settingsWithoutPassword,
            } as GameSettingsState),
          );
        }
        return null;
      }, onErr);
  };

  public getUserProfile = async (uid: string) => {
    const userSnap = await this.userProfileRef(uid).get();
    return { uid, ...userSnap.data() };
  };

  public createNewRoom = (uid: string, title: string) =>
    this.roomsRef().add({ creator: uid, title, users: [] });

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

  public listenConnectedInfo = (uid: string) => {
    if (Constants.OFF_ONLINE_STATUS) return;
    const onlineState = { state: 'online' };

    this.userDatabaseConnectedInfosRef().on('value', snapshot => {
      if (snapshot.val() === false) return;

      this.userDatabaseStatusRef(uid)
        .onDisconnect()
        .update({ state: 'offline' })
        .then(() => {
          this.userDatabaseStatusRef(uid).set(onlineState);
        });
    });
  };
}
