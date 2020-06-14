import { firestore } from 'firebase-admin';
import {
  callFunctionByCloudTask,
  deleteCloudTask,
} from '../utils/cloudTask.utils';
import { UserDocument } from '../data';
import { listenDatabase } from '../decorators/listenDatabase';
import { config } from 'firebase-functions';

export class StatusController {
  @listenDatabase({ type: 'onUpdate', ref: '/status/{userId}' })
  async onUserStatusChanged(change, context) {
    const uid = context.params.userId;
    const userRef = firestore().doc(`users/${uid}`);

    const statusSnapshot = await change.after.ref.once('value');
    const { state } = statusSnapshot.val();

    const userSnap = await userRef.get();
    const {
      lastCreatedRoom,
      lastJoinedRoom,
      cloudTaskDeleteRelatedRoom,
    } = {
      ...userSnap.data(),
    } as UserDocument;

    if (state === 'offline') {
      let cloudTaskName: string;
      if (
        !cloudTaskDeleteRelatedRoom &&
        (lastCreatedRoom || lastJoinedRoom)
      ) {
        const [response] = await callFunctionByCloudTask({
          functionName: 'userExitRoom',
          payload: {
            roomId: lastCreatedRoom || lastJoinedRoom,
            uid,
          },
          headers: { internallcall: config().internallcall.key },
        });
        cloudTaskName = response.name;
      }
      userRef.update({
        state: 'offline',
        lastChanged: firestore.FieldValue.serverTimestamp(),
        cloudTaskDeleteRelatedRoom: cloudTaskName,
      });
    }
    if (state === 'online') {
      if (cloudTaskDeleteRelatedRoom) {
        deleteCloudTask({
          functionName: 'userExitRoom',
          taskName: cloudTaskDeleteRelatedRoom,
        });
      }
      userRef.update({
        state: 'online',
        lastChanged: firestore.FieldValue.serverTimestamp(),
        cloudTaskDeleteRelatedRoom: firestore.FieldValue.delete(),
      });
    }
  }
}
