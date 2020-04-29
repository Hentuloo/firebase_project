import { useEffect, useRef, useReducer } from 'react';

import { reducer } from './reducer';
import { setNewTextAction } from './actions';

import { typingObserver } from './typingObserver';
import { typingStatus } from './types';

const initValue = {
  inputValue: '',
  wordsInArray: [] as string[],
  letterWasAdded: true,
  goodText: '',
  wrongText: '',
  cursor: 0,
  text: '',
  gameStatus: typingStatus.BEGINING,
};

export const useInputSpeedTest = (text = '') => {
  const ref = useRef<HTMLInputElement>(null);

  const [state, dispatch] = useReducer<typeof reducer>(reducer, {
    ...initValue,
    text,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // typing listener
    const sub = typingObserver(el, text, dispatch);
    return () => sub.unsubscribe();
  }, [text]);

  const setInputFocus = () => {
    const input = ref.current;
    if (!input) return;
    input.focus();
  };

  const setText = (pharse: string) =>
    dispatch(setNewTextAction(pharse));

  return {
    ...state,
    ref,
    setInputFocus,
    setText,
    text,
  };
};
