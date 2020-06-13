import * as functions from 'firebase-functions';
import { firestore, initializeApp } from 'firebase-admin';
import { bindFirebaseControllers } from './decorators/bindFirebaseControllers';
import { RoomsController } from './controllers/RoomsController';
import { UserDocument } from './data';
import { callFunctionByCloudTask } from './utils/cloudTask.utils';
import {
  exitRoomAsCreator,
  exitRoomAsPlayer,
} from './utils/rooms.utils';
initializeApp(functions.config().firebase);

// bind firebase-functions controllers
const fireFunctions = bindFirebaseControllers([
  new RoomsController(),
]);

const keys = Object.keys(fireFunctions);
keys.forEach((key: string) => {
  exports[key] = fireFunctions[key];
});

interface ClearRoomPayload {
  uid: string;
  roomId: string;
}
exports.onUserStatusChanged = functions.database
  .ref('/status/{userId}')
  .onUpdate(async (change, context) => {
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
  });

exports.userExitRoom = functions
  .region('europe-west1')
  .https.onRequest(async (req, res) => {
    const { uid, roomId } = req.body as ClearRoomPayload;

    const userRef = firestore().doc(`users/${uid}`);
    const userSnap = await userRef.get();
    const { state, lastCreatedRoom, lastJoinedRoom } = {
      ...userSnap.data(),
    } as UserDocument;

    if (!lastCreatedRoom && !lastJoinedRoom) {
      userRef.update({
        deleteRoomCloudTaskExist: firestore.FieldValue.delete(),
      });
      return;
    }

    //user is still offline now
    if (state === 'offline') {
      if (lastCreatedRoom) await exitRoomAsCreator({ roomId, uid });
      if (lastJoinedRoom) await exitRoomAsPlayer({ roomId, uid });
    } else {
      //cancel delete room task
      await userRef.update({
        deleteRoomCloudTaskExist: firestore.FieldValue.delete(),
      });
    }
    res.send({
      ok: true,
      code: 'You have access',
    });
  });
