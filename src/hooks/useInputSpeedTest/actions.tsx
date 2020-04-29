import { types } from './types';

export type SetGeneralTextAction = {
  type: types.SET_GENERAL_TEXT;
  payload: string;
};
export const setNewTextAction = (
  pharse: string,
): SetGeneralTextAction => ({
  type: types.SET_GENERAL_TEXT,
  payload: pharse,
});
