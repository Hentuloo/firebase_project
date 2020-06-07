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
    const functionsInstance = firestore || firebase.functions();
    functionsInstance.httpsCallable(functionName);
  };

  constructor(firestore?: FirebaseFunctionsType) {
    this.instance = firestore || firebase.functions();
  }

  public call = (functionName: string) =>
    this.instance.httpsCallable(functionName);

  public joinToOpenRoom = async (roomId: string, pass?: string) => {
    const joinFunc = this.call('joinToOpenRoom');
    const res = await joinFunc({ roomId, password: pass });
    return (res as unknown) as JoinRoomResponse;
  };

  public leaveRoom = async (roomId: string) => {
    const laveFunc = this.call('leaveFromOpenRoom');
    await laveFunc({ roomId });
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
}
