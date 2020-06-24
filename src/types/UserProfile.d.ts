export interface UserDocument {
  loggedRequest: boolean;
  uid: string | null;
  displayName: string | null;
  photoURL: string | null;
  wins: number;
  online: 'online' | 'offline';
  created: number | null;
}
export interface UserProfileFieldsToUpdate {
  photoURL?: string;
  displayName?: string;
}
