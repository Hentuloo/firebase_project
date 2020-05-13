import { shuffleArray } from 'utils';
import {
  removeLeterFromLastWord,
  getStatePieceWithNewLetter,
} from './utils';
import { types, Action, typingStatus } from './types';
import { timeStepsConfig } from './config';

export type StateType = {
  inputValue: string;
  writtenWords: string[];
  letterWasAddedFlag: boolean;
  goodText: string;
  wrongText: string;
  wrongLength: number;
  goodLength: number;
  cursor: number;
  textAssets?: string[];
  sourceText: string;
  sourceTextInArray: string[];
  lengthsOfSourceText: number[];
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
  const isBegining = state.gameStatus === typingStatus.BEGINING;
  const isTyping = state.gameStatus === typingStatus.TYPING;
  const isEnd = state.gameStatus === typingStatus.END;

  switch (action.type) {
    case types.SET_GENERAL_TEXT:
      return { ...state, sourceText: action.payload };

    case types.SET_TIME_STEPS: {
      if (!isBegining) return state;

      return {
        ...state,
        timeSteps: state.timeSteps - action.payload,
      };
    }

    case types.SET_INITIAL_TIME: {
      if (isTyping || isEnd) return state;
      if (typeof action.payload === 'number')
        return {
          ...state,
          timeSteps: action.payload,
          initialTimeSteps: action.payload,
        };

      const newTime = action.payload
        ? state.timeSteps + timeStepsConfig.stepsInOneMinute
        : state.timeSteps - timeStepsConfig.stepsInOneMinute;

      if (
        newTime > timeStepsConfig.maxTimeSteps ||
        newTime < timeStepsConfig.minTimeSteps
      )
        return state;
      return {
        ...state,
        timeSteps: newTime,
        initialTimeSteps: newTime,
      };
    }

    case types.SUBTRACT_TIME_STEPS: {
      const newTimeStep = state.timeSteps - 1;
      const gameTime = state.initialTimeSteps - newTimeStep;

      // Calculate new accurancy and speed
      const writtenWords = state.writtenWords.length;
      const accuracy = Number(
        (100 - (state.wrongLength / state.cursor) * 100).toFixed(2),
      );
      const speed = Number(
        (
          writtenWords /
          (gameTime / timeStepsConfig.stepsInOneMinute)
        ).toFixed(2),
      );
      const isLastTimeStep = newTimeStep === -1;
      const endState = isLastTimeStep
        ? {
            inputValue: '',
            writtenWords: [],
            goodText: '',
            wrongText: '',
            wrongLength: 0,
            goodLength: 0,
            cursor: 0,
            gameStatus: typingStatus.END,
          }
        : {};
      return {
        ...state,
        accuracy,
        speed,
        timeSteps: newTimeStep,
        ...endState,
      };
    }

    case types.INPUT_NEW_LETTER: {
      if (isEnd) return state;
      const {
        payload,
        payload: { inputValue },
      } = action;

      const isLastLetter =
        inputValue.length === state.sourceText.length;

      return {
        ...state,
        ...getStatePieceWithNewLetter(state, payload),
        gameStatus: isLastLetter
          ? typingStatus.END
          : typingStatus.TYPING,
      };
    }

    case types.INPUT_BACKSPACE: {
      if (isEnd) return state;
      return {
        ...state,
        writtenWords: removeLeterFromLastWord(state.writtenWords),
        letterWasAddedFlag: false,
        inputValue: state.inputValue.slice(0, -1),
        wrongText: state.wrongText.slice(0, -1),
        goodText: state.goodText.slice(0, -1),
      };
    }
    case types.RESET_GAME:
      return {
        ...state,
        inputValue: '',
        writtenWords: [],
        goodText: '',
        wrongText: '',
        wrongLength: 0,
        goodLength: 0,
        cursor: 0,
        gameStatus: typingStatus.BEGINING,
        timeSteps: state.initialTimeSteps,
        accuracy: 100,
        speed: 0,
      };
    case types.GENERATE_WORDS: {
      const assetsWords = state.textAssets;
      if (!assetsWords) return state;

      const randomWords = shuffleArray<string>(assetsWords);
      const newSourceTex = randomWords.join(' ');
      const newLengths = randomWords.map(word => word.length);

      return {
        ...state,
        sourceText: `${state.sourceText} ${newSourceTex}`,
        sourceTextInArray: [
          ...state.sourceTextInArray,
          ...randomWords,
        ],
        lengthsOfSourceText: [
          ...state.lengthsOfSourceText,
          ...newLengths,
        ],
      };
    }
    case types.UPDATE_SOURCE_TEXT: {
      if (isTyping) return state;
      const { text, textAssets } = action.payload;
      const sourceTextInArray = text.split(' ');

      return {
        ...state,
        sourceText: text,
        sourceTextInArray,
        lengthsOfSourceText: sourceTextInArray.map(
          word => word.length,
        ),
        textAssets,
      };
    }

    default:
      return state;
  }
};
