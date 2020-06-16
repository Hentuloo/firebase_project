import { useEffect, useRef, useReducer, useCallback } from 'react';

import { Subscription } from 'rxjs';
import { reducer } from './reducer';
import {
  setNewTextAction,
  setTimeStepsAction,
  setNewInitialTimeAction,
  resetGameStateAction,
  generateNewWords,
  updateSourceTextAction,
  changeTextAssetsAction,
  startScheudleGame,
  newMultiplayerGame,
  NewMultiplayerGamePayload,
} from './actions';

import { typingObserver } from './observables/typingObserver';
import { TypingStatus, TypingMood } from './types';
import { timeObserver } from './observables/timeObserver';
import { hotkeyObserver } from './observables/hotkeyObserver';
import { timeStepsConfig } from './config';

const initValue = {
  inputValue: '',
  writtenWords: [] as string[],
  letterWasAddedFlag: true,
  goodText: '',
  wrongText: '',
  wrongLength: 0,
  goodLength: 0,
  cursor: 0,
  gameStatus: TypingStatus.BEGINING,
  initialTimeSteps: timeStepsConfig.defaultTimeSteps,
  timeSteps: timeStepsConfig.defaultTimeSteps,
  accuracy: 100,
  speed: 0,
  snaps: [],
};

export interface UseInputSpeedTestProps {
  text: string;
  textAssets?: string[];
  time?: number;
  gameType?: TypingMood;
  onTimeStepChange?: (props: UseInputSpeedTestReturnApi) => void;
  onChangeGameStatus?: (status: TypingStatus) => void;
}

export const useInputSpeedTest = (props: UseInputSpeedTestProps) => {
  const {
    textAssets,
    text,
    gameType = TypingMood.TIME,
    time: initialTimeSteps,
    onTimeStepChange,
    onChangeGameStatus,
  } = props;

  const ref = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer<typeof reducer>(reducer, {
    ...initValue,
    sourceText: text,
    textAssets,
    sourceTextInArray: text.split(' '),
    lengthsOfSourceText: text.split(' ').map(word => word.length),
    initialTimeSteps: initialTimeSteps || initValue.initialTimeSteps,
    gameType,
  });
  const generateNewWordsFlag =
    textAssets &&
    state.writtenWords.length >= state.sourceTextInArray.length - 5;

  const setInputFocus = () => {
    const input = ref.current;
    if (!input) return;
    input.focus();
  };

  const setText = useCallback(
    (pharse: string) => dispatch(setNewTextAction(pharse)),
    [],
  );

  const setNewInitialTime = useCallback(
    (number: number) => dispatch(setNewInitialTimeAction(number)),
    [],
  );

  const startNewMultiplayerGame = useCallback(
    (settings: NewMultiplayerGamePayload) =>
      dispatch(newMultiplayerGame(settings)),
    [],
  );

  const resetGameState = useCallback(
    () => dispatch(resetGameStateAction()),
    [],
  );

  const setTimeSteps = useCallback(
    (time: number) => dispatch(setTimeStepsAction(time)),
    [],
  );

  useEffect(() => {
    // update text and textAsset
    if (state.gameStatus === TypingStatus.TYPING) return;

    dispatch(updateSourceTextAction(text, textAssets));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, textAssets]);

  useEffect(() => {
    // update textAsset after level-changed
    if (state.gameStatus === TypingStatus.TYPING) {
      dispatch(changeTextAssetsAction(textAssets));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textAssets]);

  useEffect(() => {
    // typing listener & hotkeyListener
    const el = ref.current;
    if (!el) return;

    const sub = typingObserver(el, dispatch);
    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    // hotkeyListener
    const el = ref.current;
    if (!el || state.gameType === TypingMood.MULTIPLAYER) return;

    const sub = hotkeyObserver(dispatch);
    return () => sub.unsubscribe();
  }, [state.gameType]);

  useEffect(() => {
    // time listener
    let timeSub: undefined | Subscription;
    if (state.gameStatus === TypingStatus.TYPING) {
      timeSub = timeObserver(dispatch);
    }
    return () => {
      if (timeSub) timeSub.unsubscribe();
    };
  }, [state.gameStatus]);

  useEffect(() => {
    // schedule time runner
    if (!state.startTimestamp) return;
    const timeToStart =
      state.startTimestamp * 1000 - new Date().getTime() - 100;

    if (timeToStart < 0) {
      dispatch(startScheudleGame());
      return;
    }

    const timeoutId = setTimeout(
      () => dispatch(startScheudleGame()),
      timeToStart,
    );

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [state.startTimestamp]);

  useEffect(() => {
    // generate new text from textAssets
    if (generateNewWordsFlag === true) {
      dispatch(generateNewWords());
    }
  }, [generateNewWordsFlag]);

  useEffect(() => {
    setInputFocus();
  }, []);

  useEffect(() => {
    // reset input after game end
    let tmID: number;
    if (state.gameStatus === TypingStatus.END) {
      tmID = setTimeout(() => resetGameState(), 4000);
    }
    return () => clearTimeout(tmID);
  }, [resetGameState, state.gameStatus]);

  useEffect(() => {
    if (!onTimeStepChange) return;
    onTimeStepChange({
      ...state,
      ref,
      setInputFocus,
      setText,
      text,
      setTimeSteps,
      setNewInitialTime,
      resetGameState,
      timeConfig: timeStepsConfig,
      startNewMultiplayerGame,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onTimeStepChange, state.timeSteps]);

  useEffect(() => {
    if (!onChangeGameStatus) return;
    onChangeGameStatus(state.gameStatus);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChangeGameStatus, state.gameStatus]);

  return {
    ...state,
    ref,
    setInputFocus,
    setText,
    text,
    setTimeSteps,
    setNewInitialTime,
    resetGameState,
    timeConfig: timeStepsConfig,
    startNewMultiplayerGame,
  };
};

export type UseInputSpeedTestReturnApi = ReturnType<
  typeof useInputSpeedTest
>;
