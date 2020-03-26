import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';

import { useSelector } from 'react-redux';
import { listenRooms } from 'fb/controllers/rooms';
import { Card } from 'components/molecules';
import {
  InputWithFA,
  RoomButton,
  BarDecorator,
  FilledButton,
} from 'components/atoms';

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
const StyledRoomButton = styled(RoomButton)`
  width: 100%;
  height: 90%;
  margin: 6px auto;
`;

const ButtonsWrapper = styled.div`
  width: 85%;
  max-height: 150px;
  overflow-y: scroll;
  ${({ theme }) => theme.mediaQuery.md} {
    overflow-y: initial;
    ${({ paginationStart }) =>
      paginationStart &&
      css`
        ${`${StyledRoomButton}:nth-child(-n+${paginationStart})`} {
          display: none;
        }
        ${`${StyledRoomButton}:nth-child(n+${Number(paginationStart) +
          4})`} {
          display: none;
        }
      `}
  }
`;
const RoomsPanel = () => {
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
      <ButtonsWrapper paginationStart="3">
        <StyledRoomButton number={2}> 1 Siema</StyledRoomButton>
        <StyledRoomButton number={1}>
          2 zajebisty pokój
        </StyledRoomButton>
        <StyledRoomButton number={1}> 3 Inny pokój</StyledRoomButton>
        <StyledRoomButton number={2}>4 Siema</StyledRoomButton>
        <StyledRoomButton number={1}>
          5 zajebisty pokój
        </StyledRoomButton>
        <StyledRoomButton number={1}>6 Inny pokój</StyledRoomButton>
      </ButtonsWrapper>
      <SmallerTitle>Prywatne</SmallerTitle>
      <ButtonsWrapper>
        <StyledRoomButton withKey>
          Trochę dłuższy tytuł opkoju
        </StyledRoomButton>
        <StyledRoomButton withKey>black magic</StyledRoomButton>
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default RoomsPanel;
