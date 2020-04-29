import { types } from './types';

export type ActionCreatorsBasicTypse =
  | SetGeneralTextAction
  | SetTimeStepsAction;

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

export type SetTimeStepsAction = {
  type: types.SET_TIME_STEPS;
  payload: number;
};
export const setTimeStepsAction = (
  steps: number,
): SetTimeStepsAction => ({
  type: types.SET_TIME_STEPS,
  payload: steps,
});
