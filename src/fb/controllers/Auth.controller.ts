import firebase from '../index';
import { Db } from './Db.controller';

interface CreateAccountWithEmailProps {
  email: string;
  password: string;
  displayName?: string;
}
type AuthType = firebase.auth.Auth;
export class Auth {
  public instance: AuthType;

  static init = () => {
    return new Auth();
  };

  constructor(firebaseAuth?: AuthType) {
    this.instance = firebaseAuth || firebase.auth();
  }

  public subscribeAuthChanges = (callback: any) => {
    return this.instance.onAuthStateChanged(callback);
  };

  public logout = () => {
    return this.instance.signOut();
  };

  public getCurrentUser = () => {
    return this.instance.currentUser;
  };

  public loginWithEmail = (email: string, password: string) => {
    try {
      return this.instance.signInWithEmailAndPassword(
        email,
        password,
      );
    } catch (err) {
      throw new Error(err);
    }
  };

  public createUserProfileDocument = async (
    uid: string,
    additionalProps: any,
  ) => {
    try {
      const user = Db.init().userRef(uid);
      const userSnap = await user.get();

      if (userSnap.exists) return user;
      await user.set(additionalProps);

      return user;
    } catch (err) {
      throw new Error(err);
    }
  };

  public createAccountWithEmail = async (
    { email, password, displayName }: CreateAccountWithEmailProps,
    additionalProps = {},
  ) => {
    try {
      const {
        user,
      } = await this.instance.createUserWithEmailAndPassword(
        email,
        password,
      );
      if (!user) return;
      const userRef = await this.createUserProfileDocument(user.uid, {
        displayName,
        ...additionalProps,
      });
      return userRef;
    } catch (err) {
      throw new Error(err);
    }
  };

  public loginWithGoogle = async (additionalProps = {}) => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const { user } = await this.instance.signInWithPopup(provider);
      const { uid, displayName, photoURL } = user as firebase.User;

      const userRef = await this.createUserProfileDocument(uid, {
        displayName,
        photoURL,
        ...additionalProps,
      });
      return userRef;
    } catch (err) {
      throw new Error(err);
    }
  };
}
