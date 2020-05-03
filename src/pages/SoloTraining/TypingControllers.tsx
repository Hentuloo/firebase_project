import React from 'react';
import styled from 'styled-components';
import { TypingInput, Hands } from 'components/organisms';
import { LoadingBar } from 'components/atoms';

import { soloTrainingWords } from 'config/soloTrainingWords';
import { Controllers } from './Controllers';
import { LetterObject } from './lettersReducer';

const Wrapper = styled.div`
  position: relative;
  display: grid;
  height: 100%;
  width: 100%;
  max-width: 800px;
  grid-template-rows: 1fr 50px 50px;
  justify-content: center;
  align-self: center;
  grid-column-gap: 25px;
  margin: 0px auto;
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

export interface TypingControllersProps {
  text: string;
  letters: LetterObject[];
  lastActiveIndex: number;
}

const TypingControllers: React.SFC<TypingControllersProps> = ({
  text,
}) => {
  return (
    <Wrapper>
      <StyledTypingInput
        textAssets={soloTrainingWords.z}
        text={soloTrainingWords.z.join(' ')}
        render={({
          cursor,
          timeSteps,
          initialTimeSteps,
          resetGameState,
          setNewInitialTime,
          gameStatus,
          timeConfig: { stepsInOneMinute },
        }) => (
          <>
            <Controllers
              gameStatus={gameStatus}
              stepsInOneMinute={stepsInOneMinute}
              time={Math.floor(
                Number(
                  (initialTimeSteps / stepsInOneMinute).toFixed(2),
                ),
              )}
              setTime={setNewInitialTime}
              reset={resetGameState}
            />
            <StyledHands text={text} cursor={cursor} />
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
};

export default TypingControllers;
