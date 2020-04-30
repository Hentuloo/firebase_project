import {
  removeLeterFromLastWord,
  getStatePieceWithNewLetter,
} from './utils';
import { types, Action, typingStatus } from './types';

export type StateType = {
  inputValue: string;
  wordsInArray: string[];
  letterWasAdded: boolean;
  goodText: string;
  wrongText: string;
  wrongLength: number;
  goodLength: number;
  cursor: number;
  text: string;
  gameStatus: typingStatus;
  timeSteps: number;
  initialTimeSteps: number;
  accuracy: number;
  speed: number;
};

export const reducer = (
  state: StateType,
  action: Action,
): StateType => {
  switch (action.type) {
    case types.SET_GENERAL_TEXT:
      return { ...state, text: action.payload };
    case types.SET_TIME_STEPS:
      return { ...state, timeSteps: action.payload };
    case types.SUBTRACT_TIME_STEPS: {
      const newTimeStep = state.timeSteps - 1;
      const gameTime = state.initialTimeSteps - newTimeStep;

      // Calculate new accurancy and speed
      const writtenWords = state.wordsInArray.length;
      const accuracy = Number(
        (100 - (state.wrongLength / state.cursor) * 100).toFixed(2),
      );
      const speed = Number(
        (writtenWords / (gameTime / 60)).toFixed(2),
      );

      return {
        ...state,
        accuracy,
        speed,
        timeSteps: newTimeStep,
        gameStatus:
          newTimeStep === 0 ? typingStatus.END : state.gameStatus,
      };
    }

    case types.INPUT_NEW_LETTER: {
      if (state.gameStatus === typingStatus.END) return state;
      const {
        payload,
        payload: { inputValue },
      } = action;

      const isLastLetter = inputValue.length === state.text.length;

      return {
        ...state,
        ...getStatePieceWithNewLetter(state, payload),
        gameStatus: isLastLetter
          ? typingStatus.END
          : typingStatus.TYPING,
      };
    }

    case types.INPUT_BACKSPACE: {
      if (state.gameStatus === typingStatus.END) return state;
      return {
        ...state,
        wordsInArray: removeLeterFromLastWord(state.wordsInArray),
        letterWasAdded: false,
        inputValue: state.inputValue.slice(0, -1),
        wrongText: state.wrongText.slice(0, -1),
        goodText: state.goodText.slice(0, -1),
      };
    }

    default:
      return state;
  }
};
