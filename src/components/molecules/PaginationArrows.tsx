import React, { FC } from 'react';
import styled from 'styled-components';

import { ClearButton } from 'components/atoms';

const ArrowsWrapper = styled.div`
  margin: 10px auto;
  text-align: center;
`;

interface PaginationArrowsProps {
  next: (props: any) => any;
  prev: (props: any) => any;
}

export const PaginationArrows: FC<PaginationArrowsProps> = ({
  next,
  prev,
}) => {
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
