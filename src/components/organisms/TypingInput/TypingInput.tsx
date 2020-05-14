import React, { FC } from 'react';

import styled, { css } from 'styled-components';

import { stickyModal } from 'components/molecules';
import {
  useInputSpeedTest,
  UseInputSpeedTestProps,
  UseInputSpeedTestReturnApi,
} from 'hooks/useInputSpeedTest/useInputSpeedTest';

import PanelWithTextToWrite from './PanelWithTextToWrite';
import Input from './Input';
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
  textAssets,
  className = '',
  render = null,
  ...props
}) => {
  const inputState = useInputSpeedTest({
    text,
    time,
    textAssets,
    ...props,
  });
  const {
    ref,
    inputValue,
    goodText,
    wrongText,
    writtenWords,
    letterWasAddedFlag,
    accuracy,
    speed,
    sourceTextInArray,
    sourceText,
  } = inputState;

  return (
    <>
      <Wrapper className={className}>
        <Counters accuracy={accuracy} speed={speed} />
        <InnerWrapper>
          <PanelWithTextToWrite
            todo={sourceText.slice(inputValue.length)}
            doneGood={goodText}
            doneWrong={wrongText}
          />
          <Input
            ref={ref}
            sourceTextInArray={sourceTextInArray}
            inputValue={inputValue}
            inputWordsInArray={writtenWords}
            letterWasAdded={letterWasAddedFlag}
          />
        </InnerWrapper>
      </Wrapper>
      {render && render(inputState)}
    </>
  );
};
