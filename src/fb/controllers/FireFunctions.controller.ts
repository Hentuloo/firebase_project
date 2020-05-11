import firebase from '../index';

type FirebaseFunctionsType = firebase.functions.Functions;

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

  public joinToOpenRoom = async (roomId: string) => {
    const joinFunc = this.call('joinToOpenRoom');
    const res = await joinFunc({ roomId });
    return res;
  };

  public leaveRoom = async (roomId: string) => {
    const laveFunc = this.call('leaveFromOpenRoom');
    await laveFunc({ roomId });
  };
}
