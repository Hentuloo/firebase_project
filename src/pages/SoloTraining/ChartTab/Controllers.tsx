import React, { FC } from 'react';
import styled from 'styled-components';
import { CircleButton } from 'components/atoms';

import chartIcon from 'assets/svg/icons/chartIcon.svg';

const Wrapper = styled.div`
  display: grid;
  grid-row: 2 / span 1;
  grid-auto-flow: column;
  justify-items: center;
  margin-top: 10px;
  ${({ theme }) => theme.mediaQuery.md} {
    height: 190px;
    grid-row: 1 / span 1;
    grid-auto-flow: row;
    margin-top: 150px;
    justify-items: end;
    align-self: center;
  }
`;
const ControllerWrapper = styled.div`
  position: relative;
`;
const StyledCircleButton = styled(CircleButton)`
  display: grid;
  font-size: ${({ theme }) => theme.fs.xl};
`;

const StyledCharts = styled(StyledCircleButton)``;
const ButtonImage = styled.img`
  display: block;
  margin: 0px auto;
`;

export interface ControllersProps {
  changeTab: () => void;
}

export const Controllers: FC<ControllersProps> = ({
  changeTab,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <ControllerWrapper>
        <StyledCharts title="Wykresy" onClick={changeTab}>
          <ButtonImage
            src={chartIcon}
            alt="Pokaż historie na wykresie"
          />
        </StyledCharts>
      </ControllerWrapper>
    </Wrapper>
  );
};
