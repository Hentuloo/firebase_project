import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ClearButton } from 'components/atoms';

const ArrowsWrapper = styled.div`
  margin: 10px auto;
  text-align: center;
`;

export const PaginationArrows = ({ next, prev }) => {
  return (
    <ArrowsWrapper>
      <ClearButton onClick={next}>
        <span className="sr-only">Przewiń dalej</span>
        <span className="fa fa-arrow-down" aria-hidden="true" />
      </ClearButton>
      <ClearButton onClick={prev}>
        <span className="sr-only">Przewiń wstecz</span>
        <span className="fa fa-arrow-up" aria-hidden="true" />
      </ClearButton>
    </ArrowsWrapper>
  );
};

PaginationArrows.propTypes = {
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
};
