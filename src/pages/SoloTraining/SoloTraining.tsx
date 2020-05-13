import React, { useReducer, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import WithMenuTemplate from 'templates/WithMenuTemplate';
import { LettersPanel } from 'components/organisms';

import { useSwitchTab } from 'hooks/useSwitchTab';
import { useSelector, useDispatch } from 'react-redux';
import { getSoloTrainingSnap } from 'store/actions/soloTraining';
import { getSoloTraining } from 'store/selectors/soloTraining.selector';
import { getUser } from 'store/selectors/user.selector';
import TypingTab from './TypingTab/TypingTab';
import lettersReducer, {
  types,
  lettersReducerInit,
} from './lettersReducer';
import { ChartTab } from './ChartTab/ChartTab';
import { Tabs, AddSnap } from './types';

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

const SoloTraining = () => {
  const { fetched, avaiableWord } = useSelector(getSoloTraining);
  const { uid } = useSelector(getUser);
  const reduxDispatch = useDispatch();
  const [
    {
      fetchedSettings,
      letters,
      lastActiveLetterIndex,
      firstBlockedLetterIndex,
    },
    dispatch,
  ] = useReducer<typeof lettersReducer>(
    lettersReducer,
    lettersReducerInit,
  );

  const [tabRef, changeTab] = useSwitchTab<Tabs, HTMLDivElement>(
    Tabs.TYPING,
  );

  const handleToggleLetter = useCallback(
    (e: any, id: number | string) => {
      if (!fetchedSettings) return;
      dispatch({ type: types.TOGGLE_LETTER, payload: id });
    },
    [fetchedSettings],
  );

  const addSnap: AddSnap = useCallback((time, accuracy, speed) => {
    console.log(`to-do: addSnap:${[time, accuracy, speed]}`);
  }, []);

  useEffect(() => {
    if (!uid) return;
    if (!fetched) {
      reduxDispatch(getSoloTrainingSnap(uid));
    }
    if (fetched && !fetchedSettings) {
      dispatch({
        type: types.SET_FETCHED_SETTINGS,
        payload: avaiableWord,
      });
    }
  }, [avaiableWord, fetched, fetchedSettings, reduxDispatch, uid]);

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
            addSnap={addSnap}
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
