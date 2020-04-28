import { firestore } from '../firestore';

export const getUserRef = (uid: string) =>
  firestore.doc(`users/${uid}`);

export const getUserProfile = async (uid: string) => {
  const userSnap = await getUserRef(uid).get();
  return { uid, ...userSnap.data() };
};

export const subscribeUserProfile = (uid: string, callback: any) =>
  getUserRef(uid).onSnapshot(callback);

export const createUserProfileDocument = async (
  uid: string,
  additionalProps: any,
) => {
  try {
    const userRef = await getUserRef(uid);
    const userSnap = await userRef.get();
    // if user exist
    if (userSnap.exists) return userRef;
    await userRef.set(additionalProps);
    return userRef;
  } catch (err) {
    throw new Error(err);
  }
};
export const updateUserDoc = async (uid: string, newFields: any) => {
  try {
    const userRef = await getUserRef(uid);
    await userRef.update(newFields);
  } catch (err) {
    throw new Error(err);
  }
};
