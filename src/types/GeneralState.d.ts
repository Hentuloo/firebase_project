export interface GeneralStateUsers {
  /**
   * User persence from real time database
   */
  online: number;
}
export interface GeneralStateCollection {
  users: GeneralStateUsers;
}
