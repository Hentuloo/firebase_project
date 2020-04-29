import React from 'react';
import styled from 'styled-components';
import { PaginationArrows, stickyModal } from 'components/molecules';
import { useCollapseAnimation } from 'hooks/useCollapseAnimation';

import LettersGroupWithLevels from './LettersGroupWithLevels';
import PharsesExamples from './PharsesExamples';
import NewPharse from './NewPharse';

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
interface LettersPanelProps {
  lettersArray: string[];
  toggleLetter: (e: any, id: number) => any;
}
export const LettersPanel = ({
  lettersArray,
  toggleLetter,
}: LettersPanelProps) => {
  const [ref, nextStep, prevStep] = useCollapseAnimation<
    HTMLDivElement
  >({
    initStep: 0,
    defaultSkipCount: 5,
    activeCount: 5,
    maxCount: 20,
    minCount: 0,
  });
  return (
    <Wrapper>
      <InnerWrapper ref={ref as any}>
        <LettersGroupWithLevels
          key="letters"
          lettersArray={lettersArray}
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
