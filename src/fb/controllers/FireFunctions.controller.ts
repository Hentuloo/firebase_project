import { UserProfileFieldsToUpdate } from 'types/UserProfile';
import firebase from '../index';

type FirebaseFunctionsType = firebase.functions.Functions;
export interface CreateRoomData {
  title: string;
  maxPlayersNumber: number;
  password?: string;
}
export interface JoinRoomResponse {
  data: { ok: boolean };
}
export class FireFunctions {
  public instance: FirebaseFunctionsType;

  static init = () => {
    return new FireFunctions();
  };

  static callFunction = (
    functionName: string,
    firestore?: FirebaseFunctionsType,
  ) => {
    const functionsInstance =
      firestore || firebase.app().functions('europe-west1');
    functionsInstance.httpsCallable(functionName);
  };

  constructor(firestore?: FirebaseFunctionsType) {
    this.instance =
      firestore || firebase.app().functions('europe-west1');
  }

  public call = (functionName: string) =>
    this.instance.httpsCallable(functionName);

  public joinFireRoom = (roomId: string, pass?: string) => {
    const joinFunc = this.call('joinRoom');
    return joinFunc({ roomId, password: pass });
  };

  public getAvaiableRooms = (page?: number) => {
    const fn = this.call('getAvaiableRooms');
    return fn({ page, perPage: 5 });
  };

  public leaveRoom = (roomId: string) => {
    const fn = this.call('leaveFromRoom');
    return fn({ roomId });
  };

  public startGame = (roomId: string) => {
    const fn = this.call('startGame');
    return fn({ roomId });
  };

  public callPointReached = (
    roomId: string,
    accuracy: number,
    index: number,
  ) => {
    const fn = this.call('callGamePointReached');
    return fn({ roomId, accuracy, index });
  };

  public createRoom = ({
    title,
    maxPlayersNumber,
    password,
  }: CreateRoomData) => {
    const create = this.call('createRoom');
    return create({
      title,
      maxPlayersNumber,
      password,
    });
  };

  public updateUser = (data: UserProfileFieldsToUpdate) => {
    const update = this.call('updateUser');
    return update(data);
  };
}
