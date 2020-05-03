import { useEffect, useRef, useReducer } from 'react';

import { Subscription } from 'rxjs';
import { reducer } from './reducer';
import {
  setNewTextAction,
  setTimeStepsAction,
  setNewInitialTimeAction,
  resetGameStateAction,
  generateNewWords,
} from './actions';

import { typingObserver } from './observables/typingObserver';
import { typingStatus } from './types';
import { timeObserver } from './observables/timeObserver';
import { hotkeyObserver } from './observables/hotkeyObserver';
import { timeSteps } from './config';

const initValue = {
  inputValue: '',
  writtenWords: [] as string[],
  letterWasAddedFlag: true,
  goodText: '',
  wrongText: '',
  wrongLength: 0,
  goodLength: 0,
  cursor: 0,
  gameStatus: typingStatus.BEGINING,
  initialTimeSteps: timeSteps.defaultTimeSteps,
  timeSteps: timeSteps.defaultTimeSteps,
  accuracy: 100,
  speed: 0,
};

export interface UseInputSpeedTestProps {
  text: string;
  textAssets?: string[];
  time?: number;
}

export const useInputSpeedTest = (props: UseInputSpeedTestProps) => {
  const { textAssets, text, time: initialTimeSteps } = props;

  const ref = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer<typeof reducer>(reducer, {
    ...initValue,
    sourceText: text,
    textAssets,
    sourceTextInArray: text.split(' '),
    lengthsOfSourceText: text.split(' ').map(word => word.length),
    initialTimeSteps: initialTimeSteps || initValue.initialTimeSteps,
  });
  const generateNewWordsFlag =
    textAssets &&
    state.writtenWords.length >= state.sourceTextInArray.length - 5;

  const setInputFocus = () => {
    const input = ref.current;
    if (!input) return;
    input.focus();
  };

  const setText = (pharse: string) =>
    dispatch(setNewTextAction(pharse));

  const setNewInitialTime = (number: number) =>
    dispatch(setNewInitialTimeAction(number));

  const resetGameState = () => dispatch(resetGameStateAction());

  const setTimeSteps = (time: number) =>
    dispatch(setTimeStepsAction(time));

  useEffect(() => {
    // typing listener & hotkeyListener
    const el = ref.current;
    if (!el) return;

    const sub = typingObserver(el, dispatch);
    sub.add(hotkeyObserver(dispatch));
    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    // time listener
    let timeSub: undefined | Subscription;
    if (state.gameStatus === typingStatus.TYPING) {
      timeSub = timeObserver(dispatch);
    }
    return () => {
      if (timeSub) timeSub.unsubscribe();
    };
  }, [state.gameStatus]);

  useEffect(() => {
    // update text from textAssets
    if (generateNewWordsFlag === true) {
      dispatch(generateNewWords());
    }
  }, [generateNewWordsFlag]);

  useEffect(() => {
    setInputFocus();
  }, []);

  return {
    ...state,
    ref,
    setInputFocus,
    setText,
    text,
    setTimeSteps,
    setNewInitialTime,
    resetGameState,
    timeConfig: timeSteps,
  };
};

export type UseInputSpeedTestReturnApi = ReturnType<
  typeof useInputSpeedTest
>;
