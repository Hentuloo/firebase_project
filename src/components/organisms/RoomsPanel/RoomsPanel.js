import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';

import { useSelector } from 'react-redux';
import { listenRooms } from 'fb/controllers/rooms';
import { Card } from 'components/molecules';
import {
  InputWithFA,
  BarDecorator,
  FilledButton,
} from 'components/atoms';

import ButtonsGroup from './ButtonsGroup';

const Wrapper = styled(Card)`
  grid-column: 1/-1;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  width: 100%;
  max-width: 290px;
  min-height: 250px;
  padding: 10px 5px 10px 0px;
  margin: 30px auto;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-column: 1 / span 1;
    grid-row: 2 / span 1;
    margin: 0px auto;
  }

  &::before {
    width: 130px;
  }
`;

const Title = styled.h2`
  font-weight: 600;
  text-transform: uppercase;
  margin: 5px 0px 12px;
  text-align: center;
  ${BarDecorator}
  &::after {
    width: 30%;
    transform: translate(35%, 0%);
  }
`;
const SmallerTitle = styled.h2`
  font-weight: 600;
  text-transform: uppercase;
  margin: 10px 0px 5px;
  font-size: ${({ theme }) => theme.fs.xs};
`;
const Label = styled.label`
  width: 85%;
`;
const StyledInput = styled(InputWithFA)`
  margin: 6px auto;
  padding-top: 12px;
  padding-bottom: 8px;
  font-weight: 600;
`;
const Controller = css`
  width: 100%;
  padding: 10px 0px;
  margin: 6px auto;
`;
const StyledFilledLink = styled(FilledButton)`
  ${Controller}
`;

export const RoomsPanel = () => {
  const rooms = useSelector(store => store.rooms.avaiableRooms);

  useEffect(() => {
    const unSubAvaiableRooms = listenRooms();
    return () => {
      unSubAvaiableRooms();
    };
  }, []);

  return (
    <Wrapper>
      <Title>Pokoje</Title>
      <StyledFilledLink to="/room/hello">Nowy pokój</StyledFilledLink>
      <Label>
        <span className="sr-only">Wyszukaj pokoju</span>
        <StyledInput
          iconClass="fa-search"
          type="text"
          name="displayName"
          placeholder="Nazwa pokoju"
        />
      </Label>
      <SmallerTitle>
        {rooms.length === 0 ? 'Nie ma pokoi' : 'Otwarte'}
      </SmallerTitle>
      <ButtonsGroup />
    </Wrapper>
  );
};
