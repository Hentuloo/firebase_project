import { firestore } from 'firebase-admin';

export interface ExitRoomAsPlayerProps {
  roomId: string;
  uid: string;
}

export const exitRoomAsPlayer = ({
  roomId,
  uid,
}: ExitRoomAsPlayerProps) => {
  const gamesRef = firestore().doc(`games/${roomId}`);
  const scoresRef = firestore().doc(`gamesScores/${roomId}`);
  const userRef = firestore().doc(`users/${uid}`);

  const gamePromise = gamesRef.update({
    [`registeredUsers.${uid}`]: firestore.FieldValue.delete(),
  });
  const scoresPromise = scoresRef.update({
    [`scores.${uid}`]: firestore.FieldValue.delete(),
  });
  const usersPromise = userRef.update({
    cloudTaskDeleteRelatedRoom: firestore.FieldValue.delete(),
    lastJoinedRoom: firestore.FieldValue.delete(),
  });

  return Promise.all([gamePromise, scoresPromise, usersPromise]);
};
export interface ExitRoomAsCreatorProps {
  roomId: string;
  uid: string;
}
export const exitRoomAsCreator = ({
  roomId,
  uid,
}: ExitRoomAsCreatorProps) => {
  const gamesRef = firestore().doc(`games/${roomId}`);
  const scoresRef = firestore().doc(`gamesScores/${roomId}`);
  const protectedRoomsRef = firestore().doc(`rooms/protected`);
  const openRoomsRef = firestore().doc(`rooms/open`);
  const userRef = firestore().doc(`users/${uid}`);

  const gamePromise = gamesRef.delete();
  const scoresPromise = scoresRef.delete();
  const protectedRoomsPromise = protectedRoomsRef.update({
    [roomId]: firestore.FieldValue.delete(),
  });
  const openRoomsPromise = openRoomsRef.update({
    [roomId]: firestore.FieldValue.delete(),
  });
  const userPromise = userRef.update({
    lastCreatedRoom: firestore.FieldValue.delete(),
    cloudTaskDeleteRelatedRoom: firestore.FieldValue.delete(),
  });

  return Promise.all([
    gamePromise,
    scoresPromise,
    protectedRoomsPromise,
    openRoomsPromise,
    userPromise,
  ]);
};
export interface AddPlayerToRoomProps {
  roomId: string;
  uid: string;
  displayName: string;
  photoURL: string;
}
export const addPlayerToRoom = async ({
  roomId,
  uid,
  displayName,
  photoURL,
}) => {
  const gameRef = firestore().doc(`games/${roomId}`);
  const gameScoreRef = firestore().doc(`gamesScores/${roomId}`);
  const userRef = firestore().doc(`users/${uid}`);

  const userPromise = userRef.update({
    lastJoinedRoom: roomId,
  });
  const gamePromise = gameRef.update({
    [`registeredUsers.${uid}`]: { displayName, photoURL },
  });
  const scoresPromise = gameScoreRef.update({
    [`scores.${uid}`]: {
      changes: 0,
      cursor: 0,
      lastChangesDate: 0,
      wpmSpeed: 0,
      accurancy: 0,
      points: 0,
      progress: 0,
    },
  });

  return Promise.all([gamePromise, scoresPromise, userPromise]);
};
