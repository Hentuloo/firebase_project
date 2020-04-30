import React, { useReducer } from 'react';
import styled from 'styled-components';

import WithMenuTemplate from 'templates/WithMenuTemplate';
import { LettersPanel } from 'components/organisms';

import { letters } from 'config/soloTrainingConfig';
import TypingControllers from './TypingControllers';

import lettersReducer, { types } from './choosedLettersReducer';

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

const initialState = Object.keys(letters).map(letter => ({
  ...letters[letter],
  letter,
}));

const SoloTraining = () => {
  const [lettersArray, dispatch] = useReducer<typeof lettersReducer>(
    lettersReducer,
    initialState,
  );

  const handleToggleLetter = (e: any, id: number) => {
    dispatch({ type: types.TOGGLE_LETTER, payload: id });
  };

  const text = 'fajny jest ten nowy input dobrze się to pisze';

  return (
    <WithMenuTemplate>
      <Wrapper>
        <LettersPanel
          lettersArray={lettersArray}
          toggleLetter={handleToggleLetter}
        />
        <TypingControllers text={text} letters={lettersArray} />
      </Wrapper>
    </WithMenuTemplate>
  );
};

export default SoloTraining;
