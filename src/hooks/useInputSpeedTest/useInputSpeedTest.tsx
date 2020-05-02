import { useEffect, useRef, useReducer } from 'react';

import { Subscription } from 'rxjs';
import { reducer } from './reducer';
import {
  setNewTextAction,
  setTimeStepsAction,
  setNewInitialTimeAction,
} from './actions';

import { typingObserver } from './typingObserver';
import { typingStatus } from './types';
import { timeObserver } from './timeObserver';

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
  initialTimeSteps: 30,
  timeSteps: 30,
  accuracy: 100,
  speed: 0,
};

export interface UseInputSpeedTestProps {
  text: string;
  time: number;
}

export const useInputSpeedTest = (props: UseInputSpeedTestProps) => {
  const { text, time: initialTimeSteps } = props;

  const ref = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer<typeof reducer>(reducer, {
    ...initValue,
    sourceText: text,
    sourceTextInArray: text.split(' '),
    lengthsOfSourceText: text.split(' ').map(word => word.length),
    initialTimeSteps,
  });

  const setInputFocus = () => {
    const input = ref.current;
    if (!input) return;
    input.focus();
  };

  const setText = (pharse: string) =>
    dispatch(setNewTextAction(pharse));

  const setNewInitialTime = (number: number) =>
    dispatch(setNewInitialTimeAction(number));

  const setTimeSteps = (time: number) => {
    dispatch(setTimeStepsAction(time));
  };

  useEffect(() => {
    setNewInitialTime(initialTimeSteps);
  }, [initialTimeSteps]);

  useEffect(() => {
    // typing listener
    const el = ref.current;
    if (!el) return;

    setInputFocus();
    const sub = typingObserver(el, dispatch);
    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    // time listener
    let timeSub: undefined | Subscription;
    if (state.gameStatus === typingStatus.TYPING) {
      timeSub = timeObserver(100, dispatch);
    }
    return () => {
      if (timeSub) timeSub.unsubscribe();
    };
  }, [state.gameStatus]);

  return {
    ...state,
    ref,
    setInputFocus,
    setText,
    text,
    setTimeSteps,
  };
};

export type UseInputSpeedTestReturnApi = ReturnType<
  typeof useInputSpeedTest
>;
