export interface GeneralStateUsers {
  online: number;
}
export type UpdateGeneralStateUsers = Partial<GeneralStateUsers>;
export interface GeneralStateCollection {
  users: GeneralStateUsers;
}
export type UpdateGeneralStateCollection = Partial<
  GeneralStateCollection
>;
