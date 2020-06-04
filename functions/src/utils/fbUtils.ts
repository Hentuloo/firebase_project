import { firestore } from 'firebase-admin';

export const deleteRoomWhenEmpty = async roomId => {
  const roomSnap = await firestore()
    .doc(`rooms/${roomId}`)
    .get();
  const { users } = roomSnap.data();
  if (users.length === 0) {
    await firestore()
      .doc(`rooms/${roomId}`)
      .delete();
  }
  return { ok: true };
};
