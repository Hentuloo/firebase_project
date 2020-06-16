import { types } from './types';

export type ActionCreatorsBasicTypse =
  | SetGeneralTextAction
  | SetTimeStepsAction
  | SetNewInitialTimeAction
  | ResetGameStateAction
  | GenerateNewWordsAction
  | UpdateSourceTextAction
  | ChangeTextAssetsAction
  | NewMultiplayerGame
  | StartScheudleGame;

export type GenerateNewWordsAction = {
  type: types.GENERATE_WORDS;
};
export const generateNewWords = (): GenerateNewWordsAction => ({
  type: types.GENERATE_WORDS,
});

export type UpdateSourceTextAction = {
  type: types.UPDATE_SOURCE_TEXT;
  payload: {
    text: string;
    textAssets: string[] | undefined;
  };
};
export const updateSourceTextAction = (
  text: string,
  textAssets: string[] | undefined,
): UpdateSourceTextAction => ({
  type: types.UPDATE_SOURCE_TEXT,
  payload: {
    text,
    textAssets,
  },
});

export type ChangeTextAssetsAction = {
  type: types.CHANGE_TEXT_ASSETS;
  payload: string[] | undefined;
};
export const changeTextAssetsAction = (
  textAssets: string[] | undefined,
): ChangeTextAssetsAction => ({
  type: types.CHANGE_TEXT_ASSETS,
  payload: textAssets,
});
export type ResetGameStateAction = {
  type: types.RESET_GAME;
};
export const resetGameStateAction = (): ResetGameStateAction => ({
  type: types.RESET_GAME,
});
export interface NewMultiplayerGamePayload {
  secondsToEnd: number;
  startTimestamp: number;
}
export type NewMultiplayerGame = {
  type: types.NEW_MULTIPLAYER_GAME;
  payload: NewMultiplayerGamePayload;
};
export const newMultiplayerGame = (
  settings: NewMultiplayerGamePayload,
): NewMultiplayerGame => ({
  type: types.NEW_MULTIPLAYER_GAME,
  payload: settings,
});
export type StartScheudleGame = {
  type: types.START_SCHEUDLE_GAME;
};
export const startScheudleGame = (): StartScheudleGame => ({
  type: types.START_SCHEUDLE_GAME,
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
  payload: number;
};
export const setTimeStepsAction = (
  steps: number,
): SetTimeStepsAction => ({
  type: types.SET_TIME_STEPS,
  payload: steps,
});

export type SetNewInitialTimeAction = {
  type: types.SET_INITIAL_TIME;
  payload: number | true | false;
};
export const setNewInitialTimeAction = (
  time: number | true | false,
): SetNewInitialTimeAction => ({
  type: types.SET_INITIAL_TIME,
  payload: time,
});
