import React, { FC } from 'react';
import styled from 'styled-components';
import { InputNumber } from 'components/atoms';

const Wrapper = styled.div`
  display: grid;
  grid-row: 2 / span 1;
  justify-items: end;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-row: 1 / span 1;
    margin-top: 60px;
    align-self: center;
  }
`;
const ControllerWrapper = styled.div``;
const ControllerTitle = styled.span`
  display: block;
  width: 100%;
  margin: 5px 0px;
  text-align: center;
`;

const StyledInputNumber = styled(InputNumber)``;

export interface ControllersProps {
  time: number;
  setTime: (props: number) => any;
}

export const Controllers: FC<ControllersProps> = ({
  time,
  setTime,
}) => {
  return (
    <Wrapper>
      <ControllerWrapper>
        <ControllerTitle>Czas</ControllerTitle>
        <StyledInputNumber
          insertBefore={[0.5]}
          min={1}
          max={12}
          value={time}
          onChange={setTime}
          title="Ustaw czas"
        />
      </ControllerWrapper>
    </Wrapper>
  );
};
