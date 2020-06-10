import React, { useEffect, FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'components/molecules';
import {
  InputWithFA,
  BarDecorator,
  FilledButton,
  ClearButton,
} from 'components/atoms';
import { Link } from 'react-router-dom';
import { FireFunctions } from 'fb';
import { Constants } from 'config/Constants';
import { getRooms } from 'store/selectors/rooms.selector';
import { updateAvaiableRoomsAction } from 'store/actions/rooms.actions';
import { toast } from 'react-toastify';
import RoomsList from './RoomsList';

const Wrapper = styled(Card)`
  grid-column: 1/-1;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  width: 80%;
  max-width: 290px;
  min-height: 400px;
  padding: 10px 5px 10px 0px;
  margin: 30px auto;
  ${({ theme }) => theme.mediaQuery.md} {
    max-width: 340px;
    grid-column: 1 / span 1;
    grid-row: 2 / span 1;
    margin: 0px auto;
  }

  &::before {
    width: 130px;
    height: 97%;
    ${({ theme }) => theme.mediaQuery.md} {
      width: 160px;
    }
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
  font-weight: ${({ theme }) => theme.fw[1]};
`;

const StyledFilledLink = styled(FilledButton)`
  width: 100%;
  padding: 10px 0px;
  margin: 6px auto;
  text-decoration: none;
  text-align: center;
`;

export const RoomsPanel: FC = () => {
  const dispatch = useDispatch();
  const { avaiableRooms } = useSelector(getRooms);
  const [fetching, setFetching] = useState(false);

  const updateRooms = useCallback(
    async (page = 1) => {
      try {
        const {
          data: { rooms },
        } = await FireFunctions.init().getAvaiableRooms(page);

        dispatch(updateAvaiableRoomsAction(rooms));
        setFetching(false);
      } catch ({ message }) {
        toast.error(message);
      }
    },
    [dispatch],
  );

  const handleRefetch = useCallback(() => {
    dispatch(updateAvaiableRoomsAction([]));
    setFetching(true);
    updateRooms();
  }, [dispatch, updateRooms]);

  const handleFetchNextRooms = useCallback(
    (page: number) => {
      updateRooms(page);
    },
    [updateRooms],
  );

  useEffect(() => {
    setFetching(true);
    updateRooms();
  }, [updateRooms]);

  return (
    <Wrapper>
      <Title>Pokoje</Title>
      <StyledFilledLink as={Link} to={Constants.paths.newRoom.path}>
        Nowy pokój
      </StyledFilledLink>
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
        {fetching && 'Aktualizuje...'}
        {avaiableRooms.length === 0 && !fetching && 'Nie ma pokoi'}
        {avaiableRooms.length > 0 && !fetching && 'Dostępne:'}
      </SmallerTitle>
      {avaiableRooms.length === 0 && !fetching && (
        <ClearButton onClick={handleRefetch}>
          <span className="sr-only">Odśwież</span>
          <span className="fa fa-repeat" aria-hidden="true" />
        </ClearButton>
      )}
      {avaiableRooms.length > 0 && (
        <RoomsList
          list={avaiableRooms}
          fetchNextRooms={handleFetchNextRooms}
          refetch={handleRefetch}
        />
      )}
    </Wrapper>
  );
};
