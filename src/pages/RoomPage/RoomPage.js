import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteActiveRoomData } from 'store/actions/rooms';
import { listenActiveRoom } from 'fb/controllers/rooms';
import { useRedirect } from 'hooks/useRedirect';
import { Constants } from 'config/Constants';

import RoomSettings from './RoomSettings';

const Wrapper = styled.div`
  display: grid;
`;

const RoomPage = () => {
  const redirect = useRedirect();
  const dispatch = useDispatch();
  const { roomId } = useParams();

  const [isRoomLoaded, setRoomLoaded] = useState(false);

  useEffect(() => {
    // Try to join to this room
    let unSubActiveRoom = () => null;
    const joinToRoom = async () => {
      try {
        unSubActiveRoom = await listenActiveRoom(roomId);
        setRoomLoaded(true);
      } catch (e) {
        if (e.message === 'dont exist') {
          dispatch(deleteActiveRoomData());
          redirect(Constants.paths.root.path);
        }
      }
    };

    joinToRoom();
    return () => {
      unSubActiveRoom();
    };
  }, []);

  if (!isRoomLoaded) return <span>Tu się ładuje</span>;
  return (
    <Wrapper>
      <RoomSettings />
    </Wrapper>
  );
};

export default RoomPage;
