import firebase from '../index';
import { createUserProfileDocument } from './userProfile';

// eslint-disable-next-line prefer-destructuring
const auth = firebase.auth;

export const subscribeAuthChanges = (callback: any) =>
  auth().onAuthStateChanged(callback);

export const logout = () => auth().signOut();

export const getCurrentUser = () => firebase.auth().currentUser;

export const loginWithEmail = async (
  email: string,
  password: string,
) => {
  try {
    return await auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    throw new Error(err);
  }
};
interface createAccountWithEmailProps {
  email: string;
  password: string;
  displayName?: string;
}
export const createAccountWithEmail = async (
  { email, password, displayName }: createAccountWithEmailProps,
  additionalProps = {},
) => {
  try {
    const { user } = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    if (!user) return;
    const userRef = await createUserProfileDocument(user.uid, {
      displayName,
      ...additionalProps,
    });
    return userRef;
  } catch (err) {
    throw new Error(err);
  }
};

export const loginWithGoogle = async (additionalProps = {}) => {
  try {
    const provider = new auth.GoogleAuthProvider();
    const { user } = await auth().signInWithPopup(provider);
    const { uid, displayName, photoURL } = user as firebase.User;

    const userRef = await createUserProfileDocument(uid, {
      displayName,
      photoURL,
      ...additionalProps,
    });
    return userRef;
  } catch (err) {
    throw new Error(err);
  }
};
