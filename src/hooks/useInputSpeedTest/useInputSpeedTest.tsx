import { useEffect, useRef, useReducer } from 'react';

import { Subscription } from 'rxjs';
import { reducer } from './reducer';
import { setNewTextAction, setTimeStepsAction } from './actions';

import { typingObserver } from './typingObserver';
import { typingStatus } from './types';
import { timeObserver } from './timeObserver';

const initValue = {
  inputValue: '',
  wordsInArray: [] as string[],
  letterWasAdded: true,
  goodText: '',
  wrongText: '',
  cursor: 0,
  text: '',
  gameStatus: typingStatus.BEGINING,
  timeSteps: 30,
};
export const useInputSpeedTest = (text = '') => {
  const ref = useRef<HTMLInputElement>(null);

  const [state, dispatch] = useReducer<typeof reducer>(reducer, {
    ...initValue,
    text,
  });

  useEffect(() => {
    // typing listener
    const el = ref.current;
    if (!el) return;

    const sub = typingObserver(el, dispatch);
    return () => sub.unsubscribe();
  }, [text]);

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

  const setInputFocus = () => {
    const input = ref.current;
    if (!input) return;
    input.focus();
  };

  const setText = (pharse: string) =>
    dispatch(setNewTextAction(pharse));

  const setTimeSteps = (time: number) => {
    dispatch(setTimeStepsAction(time));
  };

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
