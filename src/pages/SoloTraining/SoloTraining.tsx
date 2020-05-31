import React, { useReducer, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import WithMenuTemplate from 'templates/WithMenuTemplate';
import { LettersPanel } from 'components/organisms';

import { useSwitchTab } from 'hooks/useSwitchTab';
import { useSelector, useDispatch } from 'react-redux';
import {
  addSnapAction,
  incrementLevelAction,
} from 'store/actions/soloTraining.actions';
import { getUser } from 'store/selectors/user.selector';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { typingStatus } from 'hooks/useInputSpeedTest/types';
import { useSoloTrainingSnaps } from 'hooks/useSoloTrainingSnaps';
import { WithBackgroundTemplate } from 'templates/WithBackgroundTemplate';
import TypingTab from './TypingTab/TypingTab';
import lettersReducer, {
  types,
  lettersReducerInit,
} from './lettersReducer';
import { ChartTab } from './ChartTab/ChartTab';
import { Tabs, AddSnap } from './types';
import { Modals } from './Modals/Modals';

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
  const { fetched, level, snaps } = useSoloTrainingSnaps();
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
  const handleChangeTypingStatus = useCallback(
    (newStatus: typingStatus) =>
      dispatch({
        type: types.CHANGE_TYPING_STATUS,
        payload: newStatus,
      }),
    [],
  );

  const addSnap: AddSnap = useCallback(
    (time, accuracy, speed) => {
      if (!uid) return;
      try {
        const date = dayjs().format();
        reduxDispatch(
          addSnapAction(uid, { time, accuracy, speed, date }),
        );
      } catch ({ message }) {
        toast.success(`coś poszło nie tak${message}`);
      }
    },
    [reduxDispatch, uid],
  );

  const levelUp = useCallback(async () => {
    if (!uid || firstBlockedLetterIndex !== lastActiveLetterIndex + 1)
      return;
    try {
      await reduxDispatch(incrementLevelAction(uid));
      dispatch({ type: types.INCREASE_AVAIABLE_LEVEL });
    } catch {
      toast.error(`Nie udało się zwiększyć poziomu(błąd serwera)`);
    }
  }, [
    firstBlockedLetterIndex,
    lastActiveLetterIndex,
    reduxDispatch,
    uid,
  ]);

  useEffect(() => {
    if (fetched && !fetchedSettings) {
      dispatch({
        type: types.SET_FETCHED_SETTINGS,
        payload: level,
      });
    }
  }, [level, fetched, fetchedSettings, reduxDispatch, uid]);
  return (
    <WithMenuTemplate>
      <WithBackgroundTemplate>
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
              firstBlockedLetterIndex={firstBlockedLetterIndex}
              activeLetter={letters[lastActiveLetterIndex - 1].letter}
              changeTab={() => changeTab(Tabs.CHART)}
              addSnap={addSnap}
              snapsLength={snaps.length}
              levelUp={levelUp}
              onChangeTypingSatus={handleChangeTypingStatus}
            />
            <ChartTab
              ref={ref => {
                tabRef(ref, Tabs.CHART);
              }}
              changeTab={() => changeTab(Tabs.TYPING)}
              charts={snaps}
            />
          </TabsWrapper>
          <Modals />
        </Wrapper>
      </WithBackgroundTemplate>
    </WithMenuTemplate>
  );
};

export default SoloTraining;
