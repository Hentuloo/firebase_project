export type OnlineStates = 'online' | 'offline';

export interface UserDocument {
  /**
   * user Id
   */
  uid: string | null;
  /**
   * Time when user created account
   */
  created: number | null;
  /**
   * User display name
   */
  displayName: string | null;
  /**
   * User Photo/icon
   */
  photoURL: string | null;
  /**
   * User persence from real time database
   */
  online: OnlineStates;
  /**
   * User persence: status is 'offline' when user is away longer time (e.g. 50sec)
   */
  onlineInApp: OnlineStates;
  /**
   * User wins number
   */
  wins: number;
  /**
   * User persence: last change
   */
  lastChanged?: number;
  /**
   * scheduled cloud task name.
   * The task is running after user change online status and is offline long time
   */
  cloudTaskUserExitApplication?: string;
  /**
   * Last created room id
   */
  lastCreatedRoom?: string;
  /**
   * Last joined room id
   */
  lastJoinedRoom?: string;
}
export interface UserProfileFieldsToUpdate {
  /**
   * User Photo/icon
   */
  photoURL?: string;
  /**
   * User display name
   */
  displayName?: string;
}
