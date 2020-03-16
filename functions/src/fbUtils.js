const admin = require('firebase-admin');

const getUserRef = uid => admin.firestore().doc(`users/${uid}`);

const getUserProfile = async uid => {
  const userSnap = await getUserRef(uid).get();
  return { uid, ...userSnap.data() };
};

const deleteRoomWhenEmpty = async roomId => {
  const roomSnap = await admin
    .firestore()
    .doc(`rooms/${roomId}`)
    .get();
  const { users } = roomSnap.data();
  if (users.length === 0) {
    await admin
      .firestore()
      .doc(`rooms/${roomId}`)
      .delete();
  }
  return { ok: true };
};

module.exports = { getUserRef, getUserProfile, deleteRoomWhenEmpty };
