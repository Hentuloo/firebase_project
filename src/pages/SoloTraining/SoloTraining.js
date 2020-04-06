import React, { useReducer, useCallback } from 'react';
import styled from 'styled-components';

import WithMenuTemplate from 'templates/WithMenuTemplate';
import { TypingInput } from 'components/organisms';
import LettersPanel from './LettersPanel/LettersPanel';
import { letters } from './config';
import Hands from './hands';

const types = {
  TOGGLE_LETTER: 'TOGGLE_LETTER',
};

const Wrapper = styled.div`
  display: grid;
  width: 80%;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  margin: 0px auto;
  ${({ theme }) => theme.mediaQuery.md} {
    min-height: calc(100vh - 60px);
    width: 90%;
    grid-template-columns: 1fr 230px;
    grid-template-rows: auto;
  }
`;
const WrapperWithInput = styled.div`
  display: grid;
  height: 600px;
  grid-template-rows: 1fr 200px;
  justify-content: center;
  align-self: flex-end;
`;

const reducer = (state, action) => {
  if (action.type === types.TOGGLE_LETTER) {
    const index = action.payload;

    return [...state].map(letter =>
      letter.id === index
        ? { ...letter, active: !letter.active }
        : letter,
    );
  }
  return state;
};
const initialState = Object.keys(letters).map(letter => ({
  ...letters[letter],
  letter,
}));
const SoloTraining = () => {
  const [lettersArray, dispatch] = useReducer(reducer, initialState);

  const text = 'fajny jest ten nowy input dobrze się to pisze';

  const handleToggleLetter = (e, id) => {
    dispatch({ type: types.TOGGLE_LETTER, payload: id });
  };

  const activeFinger = useCallback(cursor => {
    const word = text.charAt(cursor);
    if (word === ' ') return 5;
    return letters[word] ? letters[word].finger : 5;
  }, []);

  return (
    <WithMenuTemplate>
      <Wrapper>
        <LettersPanel
          lettersArray={lettersArray}
          toggleLetter={handleToggleLetter}
        />
        <WrapperWithInput>
          <TypingInput
            text={text}
            render={cursor => (
              <Hands activeFinger={activeFinger(cursor)} />
            )}
          />
        </WrapperWithInput>
      </Wrapper>
    </WithMenuTemplate>
  );
};

export default SoloTraining;
