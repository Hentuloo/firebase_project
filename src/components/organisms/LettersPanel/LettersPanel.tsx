import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { PaginationArrows, stickyModal } from 'components/molecules';
import { useCollapseAnimation } from 'hooks/useCollapseAnimation';
import { UsePaginationProps } from 'hooks/usePagination';
import LettersGroupWithLevels from './LettersGroupWithLevels';
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

const collapseInit: UsePaginationProps = {
  init: 0,
  defaultSkipCount: 5,
  activeCount: 5,
  maxCount: 15,
  minCount: 0,
};

export interface LettersPanelProps {
  firstBlockedIndex: number;
  lastActiveIndex: number;
  letters: LetterObject[];
  toggleLetter: ToggleLetter;
}

export const LettersPanel: FC<LettersPanelProps> = ({
  letters,
  firstBlockedIndex,
  lastActiveIndex,
  toggleLetter,
}) => {
  const [ref, nextStep, prevStep, { from }] = useCollapseAnimation<
    HTMLDivElement
  >(collapseInit);

  useEffect(() => {
    // 16 = words per page
    const activePageByLastIndex = Math.floor(lastActiveIndex / 16);
    const activePageInCollapseComponent = from / 5;
    if (activePageByLastIndex === activePageInCollapseComponent)
      return;

    // TODO create possibility to jump into second page
    if (activePageByLastIndex > 1) {
      nextStep();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, lastActiveIndex]);

  return (
    <Wrapper>
      <InnerWrapper ref={ref}>
        <LettersGroupWithLevels
          key="letters"
          letters={letters.map((letter, index) => ({
            ...letter,
            active: lastActiveIndex > index,
            blocked: firstBlockedIndex < index + 2,
          }))}
          toggleLetter={toggleLetter}
        />
      </InnerWrapper>
      <PaginationArrows
        next={() => nextStep()}
        prev={() => prevStep()}
      />
    </Wrapper>
  );
};
