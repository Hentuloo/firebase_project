import React, { useEffect, FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'components/molecules';
import {
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
import Spiner from 'components/atoms/Spiner';
import RoomsList from './RoomsList';

const Wrapper = styled(Card)`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  padding: 15px 5px 10px 0px;

  &::before {
    width: 130px;
    height: 97%;
    box-shadow: ${({ theme }) => theme.color.shadow[1]};
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

const StyledFilledLink = styled(FilledButton)`
  width: 100%;
  padding: 10px 0px;
  margin: 8px auto;
  text-decoration: none;
  text-align: center;
`;

const SmallerTitle = styled.h2`
  font-weight: 600;
  text-transform: uppercase;
  margin: 15px 0px 10px;
  font-size: ${({ theme }) => theme.fs.xs};
`;

export interface RoomsPanelProps {
  onRoomsRefetch?: () => void;
}

export const RoomsPanel: FC<RoomsPanelProps> = ({
  onRoomsRefetch,
}) => {
  const dispatch = useDispatch();
  const { avaiableRooms } = useSelector(getRooms);
  const [fetching, setFetching] = useState(false);

  const updateRooms = useCallback(
    async (page = 1) => {
      if (onRoomsRefetch) onRoomsRefetch();
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
    [dispatch, onRoomsRefetch],
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
      <SmallerTitle>
        {fetching && 'Aktualizuje...'}
        {avaiableRooms.length === 0 && !fetching && 'Nie ma pokoi'}
        {avaiableRooms.length > 0 && !fetching && 'Dostępne:'}
      </SmallerTitle>
      {fetching && <Spiner />}
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
