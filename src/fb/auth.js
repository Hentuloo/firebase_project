import firebase from './index';
import { createUserProfileDocument } from './firestore';

// eslint-disable-next-line prefer-destructuring
const auth = firebase.auth;

export const subscribeAuthChanges = callback =>
  auth().onAuthStateChanged(callback);

export const logout = () => auth().signOut();

export const getCurrentUser = () => firebase.auth().currentUser;

export const loginWithEmail = async (email, password) => {
  try {
    return await auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const createAccountWithEmail = async (
  { email, password, displayName },
  additionalProps = {},
) => {
  try {
    const { user } = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const userRef = await createUserProfileDocument(user.uid, {
      displayName,
      ...additionalProps,
    });
    return userRef;
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const loginWithGoogle = async (additionalProps = {}) => {
  try {
    const provider = new auth.GoogleAuthProvider();
    const { user } = await auth().signInWithPopup(provider);
    const { uid, displayName, photoURL } = user;

    const userRef = await createUserProfileDocument(uid, {
      displayName,
      photoURL,
      ...additionalProps,
    });
    return userRef;
  } catch (err) {
    console.log(err);
  }
  return null;
};
