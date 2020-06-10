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
      user: { displayName, photoURL, lastCreatedRoom },
    } = data;

    if (lastCreatedRoom) {
      throw new https.HttpsError(
        'permission-denied',
        'your previous room still exists',
      );
    }

    const withPassword =
      password !== '' && password !== undefined && password !== null;

    const { id: newRoomId } = await firestore()
      .collection(`games`)
      .add({
        registeredUsers: {
          [uid]: { displayName, photoURL },
        },
        title,
        maxPlayersNumber,
        textId: null,
        changesLength: null,
        startTimestamp: null,
        endTimestamp: null,
        cursorsStamps: [],
        password: withPassword ? password : false,
        creator: uid,
        created: Date.now(),
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
      .set({
        [newRoomId]: {
          title,
          password: withPassword,
          playersNumber: maxPlayersNumber,
        },
      });
    await firestore()
      .doc(`users/${uid}`)
      .update({ lastCreatedRoom: newRoomId });

    return { roomId: newRoomId, title, maxPlayersNumber, password };
  }

  @fireMiddleware(useRequiredFields('roomId'))
  @fireMiddleware(useAuth)
  @fireMiddleware(useUserProfile)
  @fireFunction({ region: 'us-central1', type: 'onCall' })
  async joinRoom(data: JoinToOpenRoomData, context) {
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
    const {
      registeredUsers,
      password: roomPassword,
    } = gameSnap.data();

    //  user already exist
    if (registeredUsers[uid]) return { ok: true };

    const addPlayerToRoom = async () => {
      await gameRef.update({
        [`registeredUsers.${uid}`]: { displayName, photoURL },
      });

      await gameScoreRef.update({
        [`scores.${uid}`]: {
          changes: 0,
          timestamp: 0,
          cursor: 0,
          wrongLength: 0,
          goodLength: 0,
        },
      });
    };
    // user doesn't exist
    // check if room need password
    if (roomPassword === false) {
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
  async leaveFromRoom(data: LeaveFromOpenRoomData, context) {
    const { uid } = context.auth;
    const { roomId } = data;

    const gameSnap = await firestore()
      .doc(`games/${roomId}`)
      .get();
    const { creator } = gameSnap.data();

    // user is a creator -> delete all dependencies
    if (creator === uid) {
      await firestore()
        .doc(`games/${roomId}`)
        .delete();
      await firestore()
        .doc(`gamesScores/${roomId}`)
        .delete();
      await firestore()
        .doc(`rooms/protected`)
        .update({
          [roomId]: firestore.FieldValue.delete(),
        });
      await firestore()
        .doc(`rooms/open`)
        .update({
          [roomId]: firestore.FieldValue.delete(),
        });
      await firestore()
        .doc(`users/${uid}`)
        .update({ lastCreatedRoom: firestore.FieldValue.delete() });
      return {
        ok: true,
        code: 'You deleted room',
      };
    } else {
      await firestore()
        .doc(`games/${roomId}`)
        .update({
          [`registeredUsers.${uid}`]: firestore.FieldValue.delete(),
        });
      await firestore()
        .doc(`gamesScores/${roomId}`)
        .update({
          [`scores.${uid}`]: firestore.FieldValue.delete(),
        });
      return {
        ok: true,
        code: 'You deleted room',
      };
    }
  }

  @fireMiddleware(useAuth)
  @fireFunction({ region: 'us-central1', type: 'onCall' })
  async getAvaiableRooms(data: GetAvaiableRoomsData, context) {
    const { page = 1, perPage = 5 } = data;
    const openR = firestore().doc(`rooms/open`);
    const protectedR = firestore().doc(`rooms/protected`);

    const openRoomsSnap = await openR.get();
    const openRoomsData = openRoomsSnap.data();
    const openRoomKeys = Object.keys(openRoomsData);
    const openRooms = openRoomKeys.map(key => ({
      gameKey: key,
      ...openRoomsData[key],
    }));

    if (openRoomKeys.length >= page * perPage) {
      return {
        rooms: openRooms,
      };
    }

    const protectedRoomsSnap = await protectedR.get();
    const protectedRoomsData = protectedRoomsSnap.data();
    const protectedRoomKeys = Object.keys(protectedRoomsData);
    const protectedRooms = protectedRoomKeys.map(key => ({
      gameKey: key,
      ...protectedRoomsData[key],
    }));

    return {
      //All avaiable rooms
      rooms: [...openRooms, ...protectedRooms],
    };
  }
}
