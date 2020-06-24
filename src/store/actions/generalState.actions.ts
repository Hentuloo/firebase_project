import { GeneralStateUsers } from 'types/GeneralState';
import { Db } from 'fb';
import { AppThunk } from 'types/Redux';
import { Dispatch } from 'redux';
import { types } from './types';

export type GeneralStateActions = UpdateGeneralStateUsersAction;

interface UpdateGeneralStateUsersAction {
  type: types.UPDATE_GENERAL_STATE_USERS;
  payload: GeneralStateUsers;
}
export const updateGaneralStateUsers = (): AppThunk<UpdateGeneralStateUsersAction> => async (
  dispatch: Dispatch,
) => {
  try {
    const snap = await Db.init().getGeneralStateUser();
    const state = snap.data() as GeneralStateUsers;

    dispatch({
      type: types.UPDATE_GENERAL_STATE_USERS,
      payload: state,
    });
  } catch (err) {
    console.log({ ...err });
  }
};
