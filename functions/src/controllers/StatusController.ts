import { https } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import {
  callFunctionByCloudTask,
  deleteCloudTask,
} from '../utils/cloudTask.utils';
import { config } from 'firebase-functions';
import { useBearerAuth } from '../middlewares/useAuth';
import {
  use,
  fireFunction,
  listenDatabase,
} from 'firestore-decorators';
import {
  exitRoomAsCreator,
  exitRoomAsPlayer,
} from '../utils/rooms.utils';
import {
  firestoreDecrementValue,
  firestoreIncrementValue,
} from '../utils/firebaseFieldValue';
import {
  UserDocument,
  UpdateUserDocument,
} from '../types/UserDocument';
import { UpdateGeneralStateUsers } from '../types/GeneralStateDocument';

interface UserExitApplicationPayload {
  uid: string;
}

export class StatusController {
  @listenDatabase({
    dbType: 'realtime',
    listenerType: 'onUpdate',
    ref: '/status/{userId}',
  })
  async onUserStatusChanged(change, context) {
    const uid = context.params.userId;

    const userRef = firestore().doc(`users/${uid}`);
    const generalStateUsersRef = firestore().doc(
      `/generalState/users`,
    );

    const statusSnapshot = await change.after.ref.once('value');
    const { state } = statusSnapshot.val();

    const userSnap = await userRef.get();
    if (!userSnap.exists)
      throw new https.HttpsError('unavailable', "user doesn't exist");

    const { cloudTaskUserExitApplication, onlineInApp } = {
      ...userSnap.data(),
    } as UserDocument;

    if (state === 'offline') {
      let cloudTaskName: string;
      if (!cloudTaskUserExitApplication) {
        const payload: UserExitApplicationPayload = { uid };
        const [response] = await callFunctionByCloudTask({
          functionName: 'userExitApplication',
          payload,
          headers: {
            internallcall: config().internallcall.key,
          },
        });
        cloudTaskName = response.name;
      }

      userRef.update({
        online: 'offline',
        lastChanged: (firestore.FieldValue.serverTimestamp() as unknown) as number,
        cloudTaskUserExitApplication: cloudTaskName || null,
      } as UpdateUserDocument);
    }
    if (state === 'online') {
      if (cloudTaskUserExitApplication) {
        deleteCloudTask({
          functionName: 'userExitApplication',
          taskName: cloudTaskUserExitApplication,
        });
      }
      if (onlineInApp === 'offline') {
        generalStateUsersRef.update({
          online: firestoreIncrementValue(),
        } as UpdateGeneralStateUsers);
      }

      userRef.update({
        online: 'online',
        onlineInApp: 'online',
        lastChanged: (firestore.FieldValue.serverTimestamp() as unknown) as number,
        cloudTaskUserExitApplication: firestore.FieldValue.delete() as undefined,
      } as UpdateUserDocument);
    }
    return { ok: true };
  }

  @use(useBearerAuth({ allowInternallKey: true }))
  @fireFunction({ region: 'europe-west1', type: 'onRequest' })
  async userExitApplication(req, res) {
    const { uid } = req.body as UserExitApplicationPayload;

    const userRef = firestore().doc(`users/${uid}`);
    const generalStateUsersRef = firestore().doc(
      `generalState/users`,
    );

    const userSnap = await userRef.get();
    if (!userSnap.exists)
      throw new https.HttpsError('unavailable', "user doesn't exist");

    const {
      online,
      lastCreatedRoom,
      lastJoinedRoom,
    } = userSnap.data() as UserDocument;

    //user is still offline now
    if (online === 'offline') {
      if (lastCreatedRoom)
        exitRoomAsCreator({ roomId: lastCreatedRoom, uid });
      if (lastJoinedRoom)
        exitRoomAsPlayer({ roomId: lastJoinedRoom, uid });

      generalStateUsersRef.update({
        online: firestoreDecrementValue(),
      } as UpdateGeneralStateUsers);
    }
    userRef.update({
      onlineInApp: 'offline',
      cloudTaskUserExitApplication: firestore.FieldValue.delete() as undefined,
    } as UpdateUserDocument);
    res.send({
      ok: true,
      code: 'Room deleted',
    });
  }
}
