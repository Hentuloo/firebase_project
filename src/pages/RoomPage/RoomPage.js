import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRedirect } from 'hooks/useRedirect';
import { Constants } from 'config/Constants';

import { deleteActiveRoomData } from 'store/actions/rooms';
import {
  listenRoom,
  joinToOpenRoom,
  leaveRoom,
} from 'fb/controllers/rooms';

import RoomDetailsBar from './RoomDetailsBar/RoomDetailsBar';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 400px auto;
`;
// sprawdź czy usuwa document pokoju
const RoomPage = () => {
  const redirect = useRedirect();
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const { users } = useSelector(store => store.rooms.activeRoom);
  const [isRoomLoaded, setRoomLoaded] = useState(false);

  useEffect(() => {
    // Try to join to this room
    let unSubActiveRoom = () => false;
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
          console.log(e);
        }
      }
    };
    joinToRoom();
    window.addEventListener('beforeunload', unSubscribeRoom);
    return () => {
      unSubscribeRoom();
      window.removeEventListener('beforeunload', unSubscribeRoom);
    };
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
