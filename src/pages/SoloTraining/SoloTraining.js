import React, { useReducer } from 'react';
import styled from 'styled-components';

import WithMenuTemplate from 'templates/WithMenuTemplate';
import LettersPanel from './LettersPanel/LettersPanel';
import { letters } from './config';

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-template-columns: 230px;
  }
`;
const types = {
  TOGGLE_LETTER: 'TOGGLE_LETTER',
};
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

  const handleToggleLetter = (e, id) => {
    dispatch({ type: types.TOGGLE_LETTER, payload: id });
  };

  return (
    <WithMenuTemplate>
      <Wrapper>
        <LettersPanel
          lettersArray={lettersArray}
          toggleLetter={handleToggleLetter}
        />
      </Wrapper>
    </WithMenuTemplate>
  );
};

export default SoloTraining;
