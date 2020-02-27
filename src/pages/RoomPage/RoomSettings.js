import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { copyToClipBoard } from 'config/utils';
import { useSelector } from 'react-redux';
import { getCopyStatusMessage } from './utils';

const Wrapper = styled.div``;
const ActiveUsers = styled.div``;

const RoomSettings = () => {
  const [copyStatus, setCopyStatus] = useState(null);
  const { uid } = useSelector(store => store.user);
  const { users, title, creator } = useSelector(
    store => store.rooms.activeRoom,
  );

  const handleCopyLinkToClipboard = async () => {
    try {
      await copyToClipBoard(window.location.href);
      setCopyStatus(true);
    } catch (err) {
      setCopyStatus(false);
    }
  };

  const copyStatusMessage = useMemo(
    () => getCopyStatusMessage(copyStatus),
    [copyStatus],
  );

  return (
    <Wrapper>
      <p>{title}</p>
      <ActiveUsers>
        {users.map(userId => {
          if (creator === userId && uid === userId) {
            return 'Jestem założycielem!';
          }
          if (creator === userId) {
            return 'To założyciel';
          }
          if (uid === userId) {
            return 'to ja';
          }
          return userId;
        })}
      </ActiveUsers>
      <button type="button" onClick={handleCopyLinkToClipboard}>
        Skopiuj link do pokoju {copyStatusMessage}
      </button>
    </Wrapper>
  );
};

export default RoomSettings;
