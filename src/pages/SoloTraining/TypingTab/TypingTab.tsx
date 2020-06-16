import React, {
  forwardRef,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import styled from 'styled-components';
import { TypingInput, Hands } from 'components/organisms';
import { LoadingBar } from 'components/atoms';

import { soloTrainingWords } from 'config/soloTrainingWords';
import { shuffleArray } from 'utils';
import { Subject } from 'rxjs';
import { filter, skip } from 'rxjs/operators';
import { TypingStatus } from 'hooks/useInputSpeedTest/types';
import { useHistory } from 'react-router-dom';
import { Constants } from 'config/Constants';
import { UseInputSpeedTestReturnApi } from 'hooks/useInputSpeedTest/useInputSpeedTest';
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
  snapsLength: number;
  levelUp: () => void;
  firstBlockedLetterIndex: number;
  onChangeTypingSatus: (status: TypingStatus) => void;
}

const TypingTab = forwardRef<HTMLDivElement, TypingTabProps>(
  (
    {
      activeLetter,
      changeTab,
      addSnap,
      snapsLength,
      levelUp,
      firstBlockedLetterIndex,
      onChangeTypingSatus,
    },
    ref,
  ) => {
    const history = useHistory();
    const timeSteps$ = useRef(
      new Subject<[UseInputSpeedTestReturnApi, number]>(),
    );

    const text = useMemo(
      () => shuffleArray<string>(soloTrainingWords[activeLetter]),
      [activeLetter],
    );

    useEffect(() => {
      // update-level
      const steps$ = timeSteps$.current.pipe(
        filter((_, index) => index % 30 === 0),
        skip(1),
      );
      const sub = steps$.subscribe(([props, level]) => {
        const { accuracy, speed, resetGameState } = props;

        if (accuracy < 75) {
          history.push(Constants.paths.soloBadAccurancy.path);
          resetGameState();
          return;
        }

        if (level < 8 && (accuracy > 85 || speed > 30))
          return levelUp();
        if (level < 15 && (accuracy > 85 || speed > 35))
          return levelUp();
        if (level < 28 && (accuracy > 92 || speed > 40))
          return levelUp();
        if (level < 34 && (accuracy > 95 || speed > 45))
          return levelUp();
      });

      return () => sub.unsubscribe();
    }, [history, levelUp, timeSteps$]);

    const handleTimeStep = useCallback(
      (state: UseInputSpeedTestReturnApi) =>
        timeSteps$.current.next([state, firstBlockedLetterIndex]),
      [firstBlockedLetterIndex],
    );

    return (
      <Wrapper ref={ref}>
        <StyledTypingInput
          textAssets={text}
          onTimeStepChange={handleTimeStep}
          onChangeGameStatus={onChangeTypingSatus}
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
                disableCharts={snapsLength < 2}
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
