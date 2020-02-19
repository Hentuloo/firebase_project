import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { listenActiveRoom } from 'fb/controllers/rooms';

const Wrapper = styled.div`
  display: grid;
`;

const RoomPage = () => {
  // const activeRoom = useSelector(store => store.rooms.activeRoom);
  const { roomId } = useParams();
  const [copyStatus, setCopyStatus] = useState(null);

  useEffect(() => {
    // Try to join to this room
    // const unSubActiveRoom = listenActiveRoom(roomId);
    return () => {
      // unSubActiveRoom();
    };
  }, []);

  const handleCopyLinkToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus(true);
    } catch (err) {
      setCopyStatus(false);
    }
  };

  const copyStatusMessage = useMemo(() => {
    if (copyStatus !== null) {
      return copyStatus ? 'skopiowane' : 'nieskopiowane';
    }
    return null;
  }, [copyStatus]);
  return (
    <Wrapper>
      <p>Jesteś w pokoju {roomId}</p>
      <button type="button" onClick={handleCopyLinkToClipboard}>
        Skopiuj link do pokoju {copyStatusMessage}
      </button>
    </Wrapper>
  );
};

export default RoomPage;
