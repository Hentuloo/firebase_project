import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PaginationArrows, stickyModal } from 'components/molecules';
import { useCollapseAnimation } from 'hooks/useCollapseAnimation';

import LettersGroupWithLevels from './LettersGroupWithLevels';
import PharsesExamples from './PharsesExamples';
import NewPharse from './NewPharse';

const Wrapper = styled.div`
  ${stickyModal};
  padding: 15px 20px;
  display: grid;
`;
const InnerWrapper = styled.div`
  display: grid;
  height: 350px;
  grid-auto-rows: 70px;
  padding-top: 4px;
  overflow: hidden;
`;

const LettersPanel = ({ lettersArray, toggleLetter }) => {
  const [ref, nextStep, prevStep] = useCollapseAnimation({
    initStep: 0,
    defaultSkipCount: 5,
    activeCount: 5,
    maxCount: 20,
    minCount: 0,
  });
  return (
    <Wrapper>
      <InnerWrapper ref={ref}>
        <LettersGroupWithLevels
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
LettersPanel.propTypes = {
  lettersArray: PropTypes.arrayOf(
    PropTypes.shape({
      letter: PropTypes.string,
      active: PropTypes.bool,
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  toggleLetter: PropTypes.func.isRequired,
};

export default LettersPanel;
