import store from 'store/store';
import { Snap } from 'store/reducers/soloTraining.reducer';
import { updateGameSettings } from 'store/actions/gameSettings.actions';
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
          store.dispatch(
            updateGameSettings({
              withPassword: !!password,
              ...settingsWithoutPassword,
            } as GameSettingsState),
          );
        }
        return null;
      }, onErr);
  };

  public subscribeUserProfile = (uid: string, callback: any) =>
    this.userProfileRef(uid).onSnapshot(callback);

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
