import React, { FC } from 'react';
import styled from 'styled-components';
import { PaginationArrows, stickyModal } from 'components/molecules';
import { useCollapseAnimation } from 'hooks/useCollapseAnimation';

import LettersGroupWithLevels from './LettersGroupWithLevels';
import PharsesExamples from './PharsesExamples';
import NewPharse from './NewPharse';
import { LetterObject, ToggleLetter } from './types';

const Wrapper = styled.div`
  display: grid;
  max-width: 300px;
  grid-row: 3 / span 1;
  padding: 15px 20px;
  ${stickyModal};
  ${({ theme }) => theme.mediaQuery.md} {
    grid-column: 2 / span 1;
    grid-row: 1 / span 1;
    align-self: center;
  }
`;
const InnerWrapper = styled.div`
  display: grid;
  height: 350px;
  grid-auto-rows: 70px;
  padding-top: 4px;
  overflow: hidden;
`;

const collapseInit = {
  initStep: 0,
  defaultSkipCount: 5,
  activeCount: 5,
  maxCount: 15,
  minCount: 0,
};

export interface LettersPanelProps {
  activeIndex: number;
  letters: LetterObject[];
  toggleLetter: ToggleLetter;
}

export const LettersPanel: FC<LettersPanelProps> = ({
  letters,
  activeIndex,
  toggleLetter,
}) => {
  const colapse = useCollapseAnimation<HTMLDivElement>(collapseInit);
  const [ref, nextStep, prevStep] = colapse;

  return (
    <Wrapper>
      <InnerWrapper ref={ref}>
        <LettersGroupWithLevels
          key="letters"
          letters={letters.map((letter, index) => ({
            ...letter,
            active: activeIndex > index,
          }))}
          toggleLetter={toggleLetter}
        />
        <PharsesExamples />
        <NewPharse />
      </InnerWrapper>
      <PaginationArrows
        next={() => nextStep()}
        prev={() => prevStep()}
      />
    </Wrapper>
  );
};
