import firebase from './index';

const firestore = firebase.firestore();

export const getUserRef = uid => firestore.doc(`users/${uid}`);

export const getUserProfile = async uid => {
  const userSnap = await getUserRef(uid).get();
  return { uid, ...userSnap.data() };
};

export const subscribeUserProfile = (uid, callback) =>
  getUserRef(uid).onSnapshot(callback);

export const createUserProfileDocument = async (
  uid,
  additionalProps,
) => {
  try {
    const userRef = await getUserRef(uid);
    const userSnap = await userRef.get();
    // if user exist
    if (userSnap.exists) return userRef;
    await userRef.set(additionalProps);
    return userRef;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default firestore;
