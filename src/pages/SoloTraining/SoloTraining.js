import React, { useReducer, useState } from 'react';
import styled from 'styled-components';

import WithMenuTemplate from 'templates/WithMenuTemplate';
import LettersPanel from './LettersPanel/LettersPanel';
import { letters } from './config';
import Hands from './hands';
import Input from './Input';

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

const SoloTraining = () => {
  const [lettersArray, dispatch] = useReducer(reducer, letters);
  const [activeFinger, setActiveFinger] = useState(null);

  const [cursor, setCursor] = useState(0);
  const text = 'siema23 sdfasdf as fsdaasd ';

  const handleToggleLetter = (e, id) => {
    setActiveFinger(lettersArray[id - 1].finger);
    dispatch({ type: types.TOGGLE_LETTER, payload: id });
  };

  return (
    <WithMenuTemplate>
      <Wrapper>
        <LettersPanel
          lettersArray={lettersArray}
          toggleLetter={handleToggleLetter}
        />
        <WrapperWithInput>
          <Input text={text} cursor={cursor} setCursor={setCursor} />
          <Hands activeFinger={activeFinger} />
        </WrapperWithInput>
      </Wrapper>
    </WithMenuTemplate>
  );
};

export default SoloTraining;
