import React, { useReducer } from 'react';
import styled from 'styled-components';

import WithMenuTemplate from 'templates/WithMenuTemplate';
import { LettersPanel, TypingSnapsChart } from 'components/organisms';

import { letters as initialLettersObject } from 'config/soloTrainingConfig';
import TypingControllers from './TypingControllers';

import lettersReducer, {
  types,
  LetterObject,
} from './lettersReducer';

const Wrapper = styled.div`
  display: grid;
  width: 80%;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  grid-row-gap: 20px;
  margin: 0px auto;
  ${({ theme }) => theme.mediaQuery.md} {
    min-height: calc(100vh - 65px);
    width: 90%;
    grid-template-columns: 1fr 230px;
    grid-template-rows: auto;
    grid-row-gap: 0px;
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    min-height: calc(100vh - 85px);
  }
`;

const initialLetters = Object.keys(initialLettersObject).map(
  (letter): LetterObject => ({
    ...initialLettersObject[letter],
    letter,
  }),
);

const SoloTraining = () => {
  const [
    { letters, lastActiveLetterIndex, firstBlockedLetterIndex },
    dispatch,
  ] = useReducer<typeof lettersReducer>(lettersReducer, {
    letters: initialLetters,

    lastActiveLetterIndex: 6,
    firstBlockedLetterIndex: 10,
  });

  const handleToggleLetter = (e: any, id: number | string) => {
    dispatch({ type: types.TOGGLE_LETTER, payload: id });
  };

  return (
    <WithMenuTemplate>
      <Wrapper>
        <LettersPanel
          firstBlockedIndex={firstBlockedLetterIndex}
          lastActiveIndex={lastActiveLetterIndex}
          letters={letters}
          toggleLetter={handleToggleLetter}
        />
        <TypingControllers
          activeLetter={letters[lastActiveLetterIndex - 1].letter}
        />
        <TypingSnapsChart
          time={[0.4, 2, 2, 2, 2]}
          speed={[20, 40, 32, 21, 44, 11]}
          accurancy={[99, 92, 94, 91, 51, 77]}
        />
      </Wrapper>
    </WithMenuTemplate>
  );
};

export default SoloTraining;
