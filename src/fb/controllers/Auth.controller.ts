import firebase from '../index';
import { FireFunctions } from './FireFunctions.controller';

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

  public logout = () => this.instance.signOut();

  public getCurrentUser = () => this.instance.currentUser;

  public updateCredential = async (password: string) => {
    const user = this.getCurrentUser();
    if (!user || !user.email) return user;

    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password,
    );
    await user.reauthenticateWithCredential(credential);

    return user;
  };

  public deleteUser = async (password: string) => {
    const user = await this.updateCredential(password);
    if (user) return user.delete();
  };

  public loginWithEmail = (email: string, password: string) => {
    return this.instance.signInWithEmailAndPassword(email, password);
  };

  public createAccountWithEmail = async ({
    email,
    password,
    displayName,
  }: CreateAccountWithEmailProps) => {
    await this.instance.createUserWithEmailAndPassword(
      email,
      password,
    );
    await FireFunctions.init().updateUser({ displayName });
  };

  public loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await this.instance.signInWithPopup(provider);
  };
}
