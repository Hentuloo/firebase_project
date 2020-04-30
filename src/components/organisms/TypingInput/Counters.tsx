import React, { FC } from 'react';
import styled from 'styled-components';
import { StatusLabel } from 'components/atoms';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 25px;
`;
const StyledStatusLabel = styled(StatusLabel)`
  margin: 0px 14px;
  min-width: 80px;
`;

export interface CountersProps {
  accuracy: number;
  speed: number;
}

export const Counters: FC<CountersProps> = ({ accuracy, speed }) => {
  return (
    <Wrapper>
      <StyledStatusLabel
        title="Celność"
        value={`${Number.isNaN(accuracy) ? '100%' : `${accuracy}%`}`}
      />
      <StyledStatusLabel
        title="WPM"
        value={Number.isNaN(speed) ? 0 : speed}
      />
    </Wrapper>
  );
};
