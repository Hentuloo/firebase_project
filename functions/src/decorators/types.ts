export enum MetadataT {
  fireFunction,
  middleware,
  databaseListener,
}
export type FireFunctionsTypes = 'onCall' | 'onRequest';
export type ListenDatabseTypes =
  | 'onWrite'
  | 'onUpdate'
  | 'onCreate'
  | 'onDelete';
