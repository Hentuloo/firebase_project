import React, { FC } from 'react';
import styled from 'styled-components';
import exitDoor from 'assets/svg/icons/exitDoor.svg';
import { CircledButtonWithImage } from 'components/atoms/Button/CircledButtonWithImage';

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

export interface ControllersProps {
  changeTab: () => void;
}

export const Controllers: FC<ControllersProps> = ({
  changeTab,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <CircledButtonWithImage
        title="Powrót"
        onClick={changeTab}
        src={exitDoor}
        alt="Powrót"
      />
    </Wrapper>
  );
};
