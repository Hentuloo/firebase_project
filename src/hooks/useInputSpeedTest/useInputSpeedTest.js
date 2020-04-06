import { useEffect, useRef, useReducer } from 'react';
import { fromEvent } from 'rxjs';

import { reducer } from './reducer';
import types from './types';
import { inputTypingObserver } from './actions';

const initValue = {
  inputValue: '',
  wordsInArray: [],
  letterWasAdded: true,
  goodText: '',
  wrongText: '',
  cursor: 0,
  text: '',
};

export const useInputSpeedTest = text => {
  const ref = useRef(null);
  const [state, dispatch] = useReducer(reducer, {
    ...initValue,
    text: text || '',
  });

  useEffect(() => {
    // listener
    const inputTypingSub = inputTypingObserver(
      fromEvent(ref.current, 'input'),
    ).subscribe(e => dispatch(e));

    return () => {
      inputTypingSub.unsubscribe();
    };
  }, []);

  const setInputFocus = () => ref.current.focus();
  const setText = pharse =>
    dispatch({ type: types.SET_GENERAL_TEXT, payload: pharse });

  return {
    ...state,
    ref,
    setInputFocus,
    setText,
    text,
  };
};
