import { firestore } from 'firebase-admin';
import { callFunctionByCloudTask } from '../utils/cloudTask.utils';
import { UserDocument } from '../data';
import { listenDatabase } from '../decorators/listenDatabase';

export class StatusController {
  @listenDatabase({ type: 'onUpdate', ref: '/status/{userId}' })
  async onUserStatusChanged(change, context) {
    const uid = context.params.userId;
    const userRef = firestore().doc(`users/${uid}`);
    const statusSnapshot = await change.after.ref.once('value');
    const { state } = statusSnapshot.val();
    if (state === 'offline') {
      const userSnap = await userRef.get();
      const {
        lastCreatedRoom,
        lastJoinedRoom,
        deleteRoomCloudTaskExist,
      } = {
        ...userSnap.data(),
      } as UserDocument;

      userRef.update({
        state: 'offline',
        lastChanged: firestore.FieldValue.serverTimestamp(),
      });

      if (
        !deleteRoomCloudTaskExist &&
        (lastCreatedRoom || lastJoinedRoom)
      ) {
        await callFunctionByCloudTask({
          functionName: 'userExitRoom',
          payload: {
            roomId: lastCreatedRoom || lastJoinedRoom,
            uid,
          },
        });
      }
    }
  }
}
