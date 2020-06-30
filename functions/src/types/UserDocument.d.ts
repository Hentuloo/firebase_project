export type OnlineStates = 'online' | 'offline';

export interface UserDocument {
  /**
   * Time when user created account
   */
  created: number;
  /**
   * User display name
   */
  displayName: string;
  /**
   * User Photo/icon
   */
  photoURL: string;
  /**
   * User persence from real time database
   */
  online: OnlineStates;
  /**
   * !!!
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
export type UpdateUserDocument = Partial<UserDocument>;
