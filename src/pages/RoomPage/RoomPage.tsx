import React, { useEffect, useState, FC } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRedirect } from 'hooks/useRedirect';
import { Constants } from 'config/Constants';

import { deleteActiveRoomData } from 'store/actions/rooms';

import { StoreType } from 'store/store';
import { Db, FireFunctions } from 'fb';
import RoomDetailsBar from './RoomDetailsBar/RoomDetailsBar';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 400px auto;
`;
// sprawdź czy usuwa document pokoju
const RoomPage: FC = () => {
  const redirect = useRedirect();
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const { users } = useSelector(
    (store: StoreType) => store.rooms.activeRoom,
  );
  const [isRoomLoaded, setRoomLoaded] = useState(false);

  useEffect(() => {
    // Try to join to this room
    const { joinToOpenRoom, leaveRoom } = FireFunctions.init();
    const { listenRoom } = Db.init();

    let unSubActiveRoom = () => null;

    const joinToRoom = async () => {
      try {
        await joinToOpenRoom(roomId);
        unSubActiveRoom = await listenRoom(roomId);
        setRoomLoaded(true);
      } catch (e) {
        if (e.message === 'INTERNAL' || e.message === '5') {
          dispatch(deleteActiveRoomData());
          redirect(Constants.paths.root.path);
        }
      }
    };
    const unSubscribeRoom = async () => {
      if (unSubActiveRoom() !== false) {
        try {
          dispatch(deleteActiveRoomData());
          await leaveRoom(roomId);
        } catch (e) {
          Error(e);
        }
      }
    };
    joinToRoom();
    window.addEventListener('beforeunload', unSubscribeRoom);
    return () => {
      unSubscribeRoom();
      window.removeEventListener('beforeunload', unSubscribeRoom);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isRoomLoaded || !users.length)
    return <span>Tu się ładuje</span>;
  return (
    <Wrapper>
      <RoomDetailsBar />
    </Wrapper>
  );
};

export default RoomPage;
