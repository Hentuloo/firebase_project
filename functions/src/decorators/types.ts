export enum MetadataT {
  fireFunction,
  middleware,
  databaseListener,
  authListener,
}
export type ListenAuthTypes = 'onCreate' | 'onDelete';
export type FireFunctionsTypes = 'onCall' | 'onRequest';
export type ListenDatabseTypes =
  | 'onWrite'
  | 'onUpdate'
  | 'onCreate'
  | 'onDelete';
