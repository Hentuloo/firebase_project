import { shuffleArray } from 'utils';
import {
  removeLeterFromLastWord,
  getStatePieceWithNewLetter,
  generateRandomWords,
} from './utils';
import { types, Action, TypingStatus, TypingMood } from './types';
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
  gameStatus: TypingStatus;
  timeSteps: number;
  initialTimeSteps: number;
  accuracy: number;
  speed: number;
  gameType: TypingMood;
  startTimestamp?: number;
};

export const reducer = (
  state: StateType,
  action: Action,
): StateType => {
  const isBegining = state.gameStatus === TypingStatus.BEGINING;
  const isTyping = state.gameStatus === TypingStatus.TYPING;
  const isEnd = state.gameStatus === TypingStatus.END;
  const isMultiplayer = state.gameType === TypingMood.MULTIPLAYER;

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

      return {
        ...state,
        accuracy,
        speed,
        timeSteps: newTimeStep,
        gameStatus:
          newTimeStep === 0 ? TypingStatus.END : state.gameStatus,
      };
    }

    case types.INPUT_NEW_LETTER: {
      if (isEnd || isBegining) return state;

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
          ? TypingStatus.END
          : TypingStatus.TYPING,
      };
    }

    case types.INPUT_BACKSPACE: {
      if (isEnd) return state;
      if (isBegining && isMultiplayer) return state;
      return {
        ...state,
        writtenWords: removeLeterFromLastWord(state.writtenWords),
        letterWasAddedFlag: false,
        inputValue: state.inputValue.slice(0, -1),
        wrongText: state.wrongText.slice(0, -1),
        goodText: state.goodText.slice(0, -1),
      };
    }
    case types.RESET_GAME: {
      if (isMultiplayer)
        return { ...state, gameStatus: TypingStatus.BEGINING };

      const {
        randomWords,
        sourceText,
        lengths,
      } = generateRandomWords(state.textAssets);
      return {
        ...state,
        inputValue: '',
        writtenWords: [],
        goodText: '',
        wrongText: '',
        wrongLength: 0,
        goodLength: 0,
        cursor: 0,
        gameStatus: TypingStatus.BEGINING,
        timeSteps: state.initialTimeSteps,
        accuracy: 100,
        speed: 0,
        sourceText,
        sourceTextInArray: randomWords,
        lengthsOfSourceText: lengths,
      };
    }
    case types.GENERATE_WORDS: {
      const assetsWords = state.textAssets;
      if (!assetsWords) return state;
      const {
        randomWords,
        sourceText,
        lengths,
      } = generateRandomWords(assetsWords);

      return {
        ...state,
        sourceText: `${state.sourceText} ${sourceText}`,
        sourceTextInArray: [
          ...state.sourceTextInArray,
          ...randomWords,
        ],
        lengthsOfSourceText: [
          ...state.lengthsOfSourceText,
          ...lengths,
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
    case types.CHANGE_TEXT_ASSETS: {
      const newTextAssets = action.payload;
      if (isEnd || isBegining || !newTextAssets) return state;
      const randomWords = shuffleArray<string>(newTextAssets).slice();

      const writtenWrodsLength = state.writtenWords.length + 5;
      const lengthsOfSourceText = [
        ...state.lengthsOfSourceText.slice(0, writtenWrodsLength - 1),
        ...randomWords.map(word => word.length),
      ];
      const sourceTextInArray = [
        ...state.sourceTextInArray.slice(0, writtenWrodsLength - 1),
        ...randomWords,
      ];
      const sourceText = sourceTextInArray.join(' ');

      return {
        ...state,
        sourceText,
        sourceTextInArray,
        lengthsOfSourceText,
        textAssets: newTextAssets,
      };
    }
    case types.NEW_MULTIPLAYER_GAME: {
      const { secondsToEnd, startTimestamp } = action.payload;
      return {
        ...state,
        inputValue: '',
        writtenWords: [] as string[],
        letterWasAddedFlag: true,
        goodText: '',
        wrongText: '',
        wrongLength: 0,
        goodLength: 0,
        cursor: 0,
        gameStatus: TypingStatus.BEGINING,
        gameType: TypingMood.MULTIPLAYER,
        timeSteps: secondsToEnd,
        accuracy: 100,
        speed: 0,
        startTimestamp,
      };
    }
    case types.START_SCHEUDLE_GAME: {
      return {
        ...state,
        gameStatus: TypingStatus.TYPING,
      };
    }

    default:
      return state;
  }
};
