import React, { useMemo, FC } from 'react';

import styled, { css } from 'styled-components';

import { stickyModal } from 'components/molecules';
import {
  useInputSpeedTest,
  UseInputSpeedTestProps,
  UseInputSpeedTestReturnApi,
} from 'hooks/useInputSpeedTest/useInputSpeedTest';

import PanelWithTextToWrite from './PanelWithTextToWrite';
import InputComponent from './InputComponent';
import { Counters } from './Counters';

const inputFont = css`
  font-family: ${({ theme }) => theme.ff[1]};
  font-size: ${({ theme }) => theme.fs.m};
`;

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 60px 135px auto;
  grid-row-gap: 15px;
  ${inputFont}
  ${({ theme }) => theme.mediaQuery.lg} {
    grid-row-gap: 35px;
  }
`;
const InnerWrapper = styled.div`
  display: grid;
  grid-template-rows: 40px 40px;
  padding: 30px 20px;

  ${stickyModal}
  position: relative;
`;

interface TypingInput extends UseInputSpeedTestProps {
  className?: string;
  render?: (inputState: UseInputSpeedTestReturnApi) => any;
}
export const TypingInput: FC<TypingInput> = ({
  text,
  time,
  className = '',
  render = null,
}) => {
  const ArrayedSourceText = useMemo(() => text.split(' '), [text]);
  const inputState = useInputSpeedTest({ text, time });
  const {
    ref,
    inputValue,
    goodText,
    wrongText,
    wordsInArray,
    letterWasAdded,
    accuracy,
    speed,
  } = inputState;
  return (
    <>
      <Wrapper className={className}>
        <Counters accuracy={accuracy} speed={speed} />
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
      {render && render(inputState)}
    </>
  );
};
