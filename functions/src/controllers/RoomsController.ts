import { firestore } from 'firebase-admin';
import { https } from 'firebase-functions';
import { fireFunction } from '../decorators/fireFunctions';
import { useAuth } from '../middlewares/useAuth';
import { useValidator } from '../middlewares/useValidator';
import {
  useUserProfile,
  WithUserProfile,
} from '../middlewares/useUserProfile';
import {
  exitRoomAsCreator,
  exitRoomAsPlayer,
  addPlayerToRoom,
} from '../utils/rooms.utils';
import { use } from '../decorators/use';
import {
  UpdateAvaiableRoomsCollection,
  UpdateUserDocument,
  GameSettingsDoc,
  GameScoresDoc,
} from '../data';
import Validator from 'validatorjs';

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

export class RoomsController {
  @use(
    useValidator({
      title: ['required', 'min:5', 'max:18', 'regex:/^[a-z0-9 ]+$/i'],
      password: 'alpha_num|min:4|max:16',
      maxPlayersNumber: 'required|integer|min:2|max:5',
    }),
  )
  @use(useAuth)
  @use(useUserProfile)
  @fireFunction({ region: 'europe-west1', type: 'onCall' })
  async createRoom(data: CreateRoomData, context) {
    const { uid } = context.auth;
    const {
      title,
      maxPlayersNumber,
      password,
      user: { displayName, photoURL, lastCreatedRoom, wins },
    } = data;

    if (lastCreatedRoom) {
      throw new https.HttpsError(
        'permission-denied',
        'your previous room still exists',
      );
    }
    const withPassword =
      password !== '' && password !== undefined && password !== null;
    const gamesCollection = firestore().collection(`games`);
    const { id: newRoomId } = await gamesCollection.add({
      registeredUsers: {
        [uid]: { displayName, photoURL, wins },
      },
      title,
      maxPlayersNumber,
      textId: null,
      changesLength: null,
      startTimestamp: null,
      endTimestamp: null,
      password: withPassword ? password : false,
      creator: uid,
      created: Date.now(),
      usersByScores: null,
    } as GameSettingsDoc);

    const gameRef = firestore().doc(`gamesScores/${newRoomId}`);
    const roomsRef = firestore().doc(
      `rooms/${withPassword ? 'protected' : 'open'}`,
    );
    gameRef.set({
      scores: {
        [uid]: {
          changes: 0,
          cursor: 0,
          lastChangesDate: 0,
          wpmSpeed: 0,
          accuracy: 0,
          points: 0,
          progress: 0,
        },
      },
      writtenWordsByCursorsPoints: null,
      cursorPoints: [],
      startTimestamp: null,
    } as GameScoresDoc);

    roomsRef.set(
      {
        [newRoomId]: {
          title,
          password: withPassword,
          playersNumber: maxPlayersNumber,
          created: Date.now(),
        },
      } as UpdateAvaiableRoomsCollection,
      { merge: true },
    );
    firestore()
      .doc(`users/${uid}`)
      .update({
        lastCreatedRoom: newRoomId,
      } as UpdateUserDocument);

    return {
      roomId: newRoomId,
      title,
      maxPlayersNumber,
      password,
    };
  }

  @use(
    useValidator({
      roomId: 'required|alpha_num|min:10|max:35',
      password: 'alpha_num|min:4|max:16',
    }),
  )
  @use(useAuth)
  @use(useUserProfile)
  @fireFunction({ region: 'europe-west1', type: 'onCall' })
  async joinRoom(data: JoinToOpenRoomData, context) {
    const { uid } = context.auth;
    const {
      roomId,
      password,
      user: {
        displayName,
        photoURL,
        lastJoinedRoom,
        lastCreatedRoom,
        wins,
      },
    } = data;

    const gameRef = firestore().doc(`games/${roomId}`);
    const gameSnap = await gameRef.get();

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

    if (lastJoinedRoom)
      exitRoomAsPlayer({ roomId: lastJoinedRoom, uid });
    if (lastCreatedRoom)
      exitRoomAsCreator({ roomId: lastCreatedRoom, uid });

    // user doesn't exist
    // check if room need password
    if (roomPassword === false) {
      addPlayerToRoom({
        uid,
        displayName,
        photoURL: photoURL || null,
        roomId,
        wins: wins || 0,
      });
      return {
        ok: true,
        code: 'You have access',
      };
    }
    if (!password) {
      throw new https.HttpsError(
        'unavailable',
        'password is required',
      );
    }
    if (password !== roomPassword) {
      throw new https.HttpsError('unavailable', 'wrong password');
    }

    addPlayerToRoom({
      uid,
      displayName,
      photoURL: photoURL || null,
      roomId,
      wins: wins || 0,
    });
    return {
      ok: true,
      code: 'You have access',
    };
  }

  @use(
    useValidator({
      roomId: 'required|alpha_num|min:10|max:35',
    }),
  )
  @use(useAuth)
  @fireFunction({ region: 'europe-west1', type: 'onCall' })
  async leaveFromRoom(data: LeaveFromOpenRoomData, context) {
    const { uid } = context.auth;
    const { roomId } = data;

    const gameSnap = await firestore()
      .doc(`games/${roomId}`)
      .get();
    const { creator } = gameSnap.data();

    // user is a creator -> delete all dependencies
    if (creator === uid) {
      exitRoomAsCreator({ roomId, uid });
      return {
        ok: true,
        code: 'You deleted room',
      };
    }
    exitRoomAsPlayer({ roomId, uid });
    return {
      ok: true,
      code: 'You exit room',
    };
  }

  @use(useAuth)
  @fireFunction({ region: 'europe-west1', type: 'onCall' })
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
      // All avaiable rooms
      rooms: [...openRooms, ...protectedRooms],
    };
  }
}
