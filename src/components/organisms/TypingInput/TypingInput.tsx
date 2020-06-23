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
  min-width: 250px;
  grid-template-rows: 60px 135px auto;
  grid-row-gap: 15px;

  ${inputFont}
  ${({ theme }) => theme.mediaQuery.lg} {
    grid-row-gap: 35px;
  }
  ${({ withoutCounters }: { withoutCounters: boolean }) =>
    withoutCounters &&
    css`
      grid-template-rows: 135px auto;
    `}
`;
const InnerWrapper = styled.div`
  display: grid;
  grid-template-rows: 2/3;
  grid-template-rows: 40px 40px;
  padding: 30px 20px;

  ${stickyModal}
  position: relative;
  ${({ theme }) => theme.mediaQuery.lg} {
    grid-row-gap: 8px;
  }
`;

interface TypingInput extends UseInputSpeedTestProps {
  className?: string;
  withoutCounters?: boolean;
  render?: (inputState: UseInputSpeedTestReturnApi) => any;
}
export const TypingInput: FC<TypingInput> = ({
  text,
  time,
  textAssets,
  className = '',
  render = null,
  withoutCounters = false,
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
    gameStatus,
  } = inputState;

  return (
    <>
      <Wrapper
        className={className}
        withoutCounters={withoutCounters}
      >
        {!withoutCounters && (
          <Counters accuracy={accuracy} speed={speed} />
        )}
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
            gameStatus={gameStatus}
          />
        </InnerWrapper>
      </Wrapper>
      {render && render(inputState)}
    </>
  );
};
