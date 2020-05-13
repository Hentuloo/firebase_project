import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { TypingInput, Hands } from 'components/organisms';
import { LoadingBar } from 'components/atoms';

import { soloTrainingWords } from 'config/soloTrainingWords';
import { shuffleArray } from 'utils';
import { Controllers } from './Controllers';
import { AddSnap } from '../types';

const Wrapper = styled.div`
  position: absolute;
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: 1fr 50px 50px;
  top: 0%;
  left: 0%;
  justify-content: center;
  align-self: center;
  grid-column-gap: 25px;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-template-rows: 1fr 200px 50px;
    grid-template-columns: 40px 1fr;
  }
`;
const StyledTypingInput = styled(TypingInput)`
  align-self: center;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-column: 2/-1;
  }
`;
const StyledLoadingBar = styled(LoadingBar)`
  position: absolute;
  width: 80%;
  height: 10px;
  max-width: 550px;
  bottom: 1%;
  left: 50%;
  transform: translate(-50%, 0%);
  ${({ theme }) => theme.mediaQuery.md} {
    grid-column: 1/-1;
  }
`;
const StyledHands = styled(Hands)`
  display: none;
  ${({ theme }) => theme.mediaQuery.md} {
    justify-self: center;
    grid-column: 1/-1;
    display: block;
  }
`;

export interface TypingTabProps {
  activeLetter: string;
  changeTab: () => void;
  addSnap: AddSnap;
}

const TypingTab = forwardRef<HTMLDivElement, TypingTabProps>(
  ({ activeLetter, changeTab, addSnap }, ref) => {
    const text = shuffleArray<string>(
      soloTrainingWords[activeLetter],
    );

    return (
      <Wrapper ref={ref}>
        <StyledTypingInput
          textAssets={text}
          text={text.join(' ')}
          render={({
            cursor,
            timeSteps,
            initialTimeSteps,
            resetGameState,
            setNewInitialTime,
            gameStatus,
            timeConfig: { stepsInOneMinute },
            sourceText,
            accuracy,
            speed,
          }) => (
            <>
              <Controllers
                accuracy={accuracy}
                speed={speed}
                gameStatus={gameStatus}
                stepsInOneMinute={stepsInOneMinute}
                initTime={Number(
                  (initialTimeSteps / stepsInOneMinute).toFixed(2),
                )}
                timeStep={Math.floor(
                  Number(
                    (initialTimeSteps / stepsInOneMinute).toFixed(2),
                  ),
                )}
                setTime={setNewInitialTime}
                reset={resetGameState}
                changeTab={changeTab}
                addSnap={addSnap}
              />
              <StyledHands text={sourceText} cursor={cursor} />
              <StyledLoadingBar
                green
                easing="linear"
                duration={1}
                progress={Number(
                  ((timeSteps / initialTimeSteps) * 100).toFixed(2),
                )}
              />
            </>
          )}
        />
      </Wrapper>
    );
  },
);

export default TypingTab;
