import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { stickyModal } from 'components/molecules';
import { useInputSpeedTest } from 'hooks/useInputSpeedTest/useInputSpeedTest';

import PanelWithTextToWrite from './PanelWithTextToWrite';
import InputComponent from './InputComponent';

const inputFont = css`
  font-family: 'PT Mono', monospace;
  font-size: ${({ theme }) => theme.fs.m};
`;

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 40px 135px auto;
  ${inputFont}
`;
const InnerWrapper = styled.div`
  display: grid;
  grid-template-rows: 40px 40px;
  padding: 30px 20px;

  ${stickyModal}
  position: relative;
`;

export const TypingInput = ({ text, render }) => {
  const ArrayedSourceText = useMemo(() => text.split(' '), [text]);
  const {
    ref,
    inputValue,
    goodText,
    wrongText,
    wordsInArray,
    letterWasAdded,
    // setText,
  } = useInputSpeedTest(text);

  return (
    <>
      <Wrapper>
        <div>Kontrolki</div>
        <InnerWrapper>
          <PanelWithTextToWrite
            todo={text.slice(inputValue.length)}
            doneGood={goodText}
            doneWrong={wrongText}
          />
          <InputComponent
            ref={ref}
            ArrayedSourceText={ArrayedSourceText}
            inputValue={inputValue}
            inputWordsInArray={wordsInArray}
            letterWasAdded={letterWasAdded}
          />
        </InnerWrapper>
      </Wrapper>
      {render && render(inputValue.length)}
    </>
  );
};

TypingInput.propTypes = {
  text: PropTypes.string.isRequired,
  render: PropTypes.func,
};
TypingInput.defaultProps = {
  render: null,
};
