import { types } from './types';

export type ActionCreatorsBasicTypse =
  | SetGeneralTextAction
  | SetTimeStepsAction
  | SetNewInitialTimeAction
  | ResetGameStateAction;

export type ResetGameStateAction = {
  type: types.RESET_GAME;
};
export const resetGameStateAction = (): ResetGameStateAction => ({
  type: types.RESET_GAME,
});

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
  payload: number | true | false;
};
export const setTimeStepsAction = (
  steps: number | true | false,
): SetTimeStepsAction => ({
  type: types.SET_TIME_STEPS,
  payload: steps,
});

export type SetNewInitialTimeAction = {
  type: types.SET_INITIAL_TIME;
  payload: number;
};
export const setNewInitialTimeAction = (
  time: number,
): SetNewInitialTimeAction => ({
  type: types.SET_INITIAL_TIME,
  payload: time,
});
