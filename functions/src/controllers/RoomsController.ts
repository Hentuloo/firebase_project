import { firestore } from 'firebase-admin';
import { fireFunction } from '../decorators/fireFunctions';
import { fireMiddleware } from '../decorators/fireMiddleware';
import { FunctionsIndex } from '../decorators/bindFirebaseControllers';
import { useAuth } from '../middlewares/useAuth';
import { useRequiredFields } from '../middlewares/useRequiredFields';
import { useUserProfile } from '../middlewares/useUserProfile';

import { deleteRoomWhenEmpty } from '../utils/fbUtils';

const { arrayUnion } = firestore.FieldValue;

interface JoinToOpenRoomData {
  roomId: string;
  user: {
    displayName: string;
    photoURL: string;
  };
}

interface LeaveFromOpenRoomData {
  roomId: string;
}

export class RoomsController extends FunctionsIndex {
  @fireMiddleware(useRequiredFields('roomId'))
  @fireMiddleware(useAuth)
  @fireMiddleware(useUserProfile)
  @fireFunction({ region: 'us-central1', type: 'onCall' })
  async joinToOpenRoom(data: JoinToOpenRoomData, context) {
    const { uid } = context.auth;
    const {
      roomId,
      user: { displayName, photoURL },
    } = data;
    await firestore()
      .doc(`rooms/${roomId}`)
      .update({
        users: arrayUnion({
          uid,
          displayName,
          photoURL: photoURL || null,
        }),
      });
    return { ok: true };
  }

  @fireMiddleware(useRequiredFields('roomId'))
  @fireMiddleware(useAuth)
  @fireFunction({ region: 'us-central1', type: 'onCall' })
  async leaveFromOpenRoom(data: LeaveFromOpenRoomData, context) {
    const { uid } = context.auth;
    const { roomId } = data;
    const roomSnap = await firestore()
      .doc(`rooms/${roomId}`)
      .get();
    const { users } = roomSnap.data();

    if (users.length === 1) {
      setTimeout(() => deleteRoomWhenEmpty(roomId), 60000);
    }

    await firestore()
      .doc(`rooms/${roomId}`)
      .update({
        users: users.filter(user => user.uid !== uid),
      });

    return { ok: true };
  }
}
