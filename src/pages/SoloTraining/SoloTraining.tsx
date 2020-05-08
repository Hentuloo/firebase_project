import React, { useReducer } from 'react';
import styled from 'styled-components';

import WithMenuTemplate from 'templates/WithMenuTemplate';
import { LettersPanel } from 'components/organisms';
import { letters as initialLettersObject } from 'config/soloTrainingConfig';
import { useSwitchTab } from 'hooks/useSwitchTab';
import TypingTab from './TypingTab/TypingTab';
import lettersReducer, {
  types,
  LetterObject,
} from './lettersReducer';
import { ChartTab } from './ChartTab/ChartTab';

const Wrapper = styled.div`
  display: grid;
  width: 80%;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  grid-row-gap: 20px;
  margin: 0px auto;
  ${({ theme }) => theme.mediaQuery.md} {
    min-height: calc(100vh - 65px);
    width: 90%;
    grid-template-columns: 1fr 230px;
    grid-template-rows: auto;
    grid-row-gap: 0px;
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    min-height: calc(100vh - 85px);
  }
`;
const TabsWrapper = styled.div`
  position: relative;
  height: 330px;
  width: 100%;
  max-width: 800px;
  margin: 0px auto;
  ${({ theme }) => theme.mediaQuery.md} {
    height: auto;
  }
`;

const initialLetters = Object.keys(initialLettersObject).map(
  (letter): LetterObject => ({
    ...initialLettersObject[letter],
    letter,
  }),
);
enum Tabs {
  TYPING,
  CHART,
}
const SoloTraining = () => {
  const [
    { letters, lastActiveLetterIndex, firstBlockedLetterIndex },
    dispatch,
  ] = useReducer<typeof lettersReducer>(lettersReducer, {
    letters: initialLetters,

    lastActiveLetterIndex: 6,
    firstBlockedLetterIndex: 10,
  });

  const [tabRef, changeTab] = useSwitchTab<Tabs, HTMLDivElement>(
    Tabs.TYPING,
  );

  const handleToggleLetter = (e: any, id: number | string) => {
    dispatch({ type: types.TOGGLE_LETTER, payload: id });
  };

  return (
    <WithMenuTemplate>
      <Wrapper>
        <LettersPanel
          firstBlockedIndex={firstBlockedLetterIndex}
          lastActiveIndex={lastActiveLetterIndex}
          letters={letters}
          toggleLetter={handleToggleLetter}
        />
        <TabsWrapper>
          <TypingTab
            ref={ref => tabRef(ref, Tabs.TYPING)}
            activeLetter={letters[lastActiveLetterIndex - 1].letter}
            changeTab={() => changeTab(Tabs.CHART)}
          />
          <ChartTab
            ref={ref => {
              tabRef(ref, Tabs.CHART);
            }}
            changeTab={() => changeTab(Tabs.TYPING)}
          />
        </TabsWrapper>
      </Wrapper>
    </WithMenuTemplate>
  );
};

export default SoloTraining;
