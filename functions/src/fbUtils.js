const admin = require('firebase-admin');

const getUserRef = uid => admin.firestore().doc(`users/${uid}`);

const getUserProfile = async uid => {
  const userSnap = await getUserRef(uid).get();
  return { uid, ...userSnap.data() };
};

module.exports = { getUserRef, getUserProfile };
