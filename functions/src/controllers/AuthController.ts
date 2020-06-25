import firebase from 'firebase';
import { firestore } from 'firebase-admin';
import { listenAuth } from '../decorators/listenAuth';
import { fireFunction } from '../decorators/fireFunctions';
import { defaultUser, defaultUserSolo } from '../config/defaults';
import { use } from '../decorators/use';
import { useAuth } from '../middlewares/useAuth';
import { UserDocument } from '../data';
import { useValidator } from '../middlewares/useValidator';
import {
  exitRoomAsCreator,
  exitRoomAsPlayer,
} from '../utils/rooms.utils';

interface UpdateUserProfile {
  displayName: string;
  photoURL: string;
}

export class AuthController {
  @listenAuth({ type: 'onCreate' })
  async onCreateUser(userRecord, context) {
    const {
      uid,
      displayName = 'nazwa gracza',
      photoURL = null,
    } = userRecord as firebase.User;
    const userReference = firestore().doc(`/users/${uid}`);
    const userTrainingRef = firestore().doc(`usersSolo/${uid}`);

    const created = Date.now();

    const defaultSoloTraining = { ...defaultUserSolo };
    defaultSoloTraining.snaps[0].data = created;

    const userRef = await userReference.get();
    if (userRef.exists) {
      return userRef;
    }

    await userReference.set({
      ...defaultUser,
      created,
      displayName,
      photoURL,
    } as UserDocument);
    await userTrainingRef.set(defaultSoloTraining);

    return userRef;
  }
  @listenAuth({ type: 'onDelete' })
  async onDeleteUser(userRecord) {
    const { uid } = userRecord as firebase.User;
    const userReference = firestore().doc(`/users/${uid}`);
    const userTrainingRef = firestore().doc(`usersSolo/${uid}`);

    const userSnap = await userReference.get();
    const {
      lastCreatedRoom,
      lastJoinedRoom,
    } = userSnap.data() as UserDocument;
    if (lastCreatedRoom)
      exitRoomAsCreator({ roomId: lastCreatedRoom, uid });
    if (lastJoinedRoom)
      exitRoomAsPlayer({ roomId: lastJoinedRoom, uid });
    userReference.delete();
    userTrainingRef.delete();
    return { ok: true };
  }
  @use(
    useValidator({
      displayName: ['min:4', 'max:18', 'regex:/^[a-z0-9 ]+$/i'],
      photoURL: 'url',
    }),
  )
  @use(useAuth)
  @fireFunction({ region: 'europe-west1', type: 'onCall' })
  async updateUser(data: UpdateUserProfile, context) {
    const { uid } = context.auth;
    const { displayName, photoURL } = data;
    const userReference = firestore().doc(`/users/${uid}`);

    let fieldsToUpdate = {} as {
      displayName?: string;
      photoURL?: string;
    };
    if (displayName) fieldsToUpdate.displayName = displayName;
    if (photoURL) fieldsToUpdate.photoURL = photoURL;

    await userReference.set(fieldsToUpdate, { merge: true });
    return { ok: true };
  }
}
