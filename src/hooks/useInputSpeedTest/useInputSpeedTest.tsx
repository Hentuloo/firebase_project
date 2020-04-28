import { useEffect, useRef, useReducer } from 'react';
import { fromEvent } from 'rxjs';

import { reducer } from './reducer';
import { types, Action } from './types';
import { inputTypingObserver } from './actions';

const initValue = {
  inputValue: '',
  wordsInArray: [] as string[],
  letterWasAdded: true,
  goodText: '',
  wrongText: '',
  cursor: 0,
  text: '',
};

export type SetGeneralTextAction = {
  type: types.SET_GENERAL_TEXT;
  payload: string;
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
    // listener
    const inputTypingSub = inputTypingObserver(
      fromEvent(el, 'input'),
    ).subscribe(e => dispatch(e as Action));

    return () => {
      inputTypingSub.unsubscribe();
    };
  }, []);

  const setInputFocus = () => {
    const input = ref.current;
    if (!input) return;
    input.focus();
  };
  const setText = (pharse: string) =>
    dispatch({
      type: types.SET_GENERAL_TEXT,
      payload: pharse,
    } as SetGeneralTextAction);

  return {
    ...state,
    ref,
    setInputFocus,
    setText,
    text,
  };
};
