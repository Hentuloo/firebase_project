import { firestore } from 'firebase-admin';
import { fireFunction } from '../decorators/fireFunctions';
import { fireMiddleware } from '../decorators/fireMiddleware';
import { FunctionsIndex } from '../decorators/bindFirebaseControllers';
import { useAuth } from '../middlewares/useAuth';
import { useRequiredFields } from '../middlewares/useRequiredFields';

import {
  useUserProfile,
  WithUserProfile,
} from '../middlewares/useUserProfile';
import { deleteRoomWhenEmpty } from '../utils/fbUtils';
import { https } from 'firebase-functions';

interface JoinToOpenRoomData extends WithUserProfile {
  roomId: string;
  password?: string;
}

interface LeaveFromOpenRoomData {
  roomId: string;
}
interface GetAvaiableRoomsData {
  page?: number;
  perPage?: number;
}

interface CreateRoomData extends WithUserProfile {
  title: string;
  maxPlayersNumber: number;
  password?: string;
}

export class RoomsController extends FunctionsIndex {
  @fireMiddleware(useRequiredFields('title', 'maxPlayersNumber'))
  @fireMiddleware(useAuth)
  @fireMiddleware(useUserProfile)
  @fireFunction({ region: 'us-central1', type: 'onCall' })
  async createRoom(data: CreateRoomData, context) {
    const { uid } = context.auth;
    const {
      title,
      maxPlayersNumber,
      password,
      user: { displayName, photoURL },
    } = data;

    const withPassword =
      password !== '' && password !== undefined && password !== null;

    const { id: newRoomId } = await firestore()
      .collection(`games`)
      .add({
        registeredUsers: {
          [uid]: { displayName, photoURL },
        },
        maxPlayersNumber,
        textId: null,
        changesLength: null,
        startTimestamp: null,
        endTimestamp: null,
        cursorsStamps: [],
        password: withPassword ? password : false,
        creator: uid,
      });

    await firestore()
      .doc(`gamesScores/${newRoomId}`)
      .set({
        scores: {
          [uid]: {
            changes: 0,
            timestamp: 0,
            cursor: 0,
            wrongLength: 0,
            goodLength: 0,
          },
        },
      });

    await firestore()
      .doc(`rooms/${withPassword ? 'protected' : 'open'}`)
      .update({
        rooms: firestore.FieldValue.arrayUnion({
          title,
          gameKey: newRoomId,
          password: withPassword,
          playersNumber: maxPlayersNumber,
        }),
      });

    return { roomId: newRoomId, title, maxPlayersNumber, password };
  }

  @fireMiddleware(useRequiredFields('roomId'))
  @fireMiddleware(useAuth)
  @fireMiddleware(useUserProfile)
  @fireFunction({ region: 'us-central1', type: 'onCall' })
  async joinToOpenRoom(data: JoinToOpenRoomData, context) {
    const { uid } = context.auth;
    const {
      roomId,
      password,
      user: { displayName, photoURL },
    } = data;
    const gameRef = firestore().doc(`games/${roomId}`);
    const gameSnap = await gameRef.get();
    const gameScoreRef = firestore().doc(`gamesScores/${roomId}`);

    if (!gameSnap.exists) {
      throw new https.HttpsError(
        'unavailable',
        "this room does'n exist",
      );
    }
    const roomData = gameSnap.data();
    const { registeredUsers, password: roomPassword } = roomData;

    //  user already exist
    if (registeredUsers[uid]) return { ok: true };

    const addPlayerToRoom = async () => {
      await gameRef.set({
        registeredUsers: {
          [uid]: { displayName, photoURL },
        },
      });
      await gameScoreRef.set({
        scores: {
          [uid]: {
            changes: 0,
            timestamp: 0,
            cursor: 0,
            wrongLength: 0,
            goodLength: 0,
          },
        },
      });
    };
    // user doesn't exist
    // check if room need password
    if (!roomPassword) {
      await addPlayerToRoom();
      return {
        ok: true,
        code: 'You have access',
      };
    } else {
      if (!password) {
        throw new https.HttpsError(
          'unavailable',
          'password is required',
        );
      }
      if (password !== roomPassword) {
        throw new https.HttpsError('unavailable', 'wrong password');
      }

      await addPlayerToRoom();
      return {
        ok: true,
        code: 'You have access',
      };
    }
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

  @fireMiddleware(useAuth)
  @fireFunction({ region: 'us-central1', type: 'onCall' })
  async getAvaiableRooms(data: GetAvaiableRoomsData, context) {
    const { page = 1, perPage = 5 } = data;
    const openR = firestore().doc(`rooms/open`);
    const protectedR = firestore().doc(`rooms/protected`);
    const openRoomsSnap = await openR.get();
    const { rooms: openRooms } = openRoomsSnap.data();

    if (openRooms.length >= page * perPage) {
      return {
        rooms: openRooms,
      };
    }
    const protectedRoomsSnap = await protectedR.get();
    const { rooms: protectedRooms } = protectedRoomsSnap.data();
    const allRooms = [...openRooms, ...protectedRooms];

    return {
      rooms: allRooms,
    };
  }
}
