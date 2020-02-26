import React, { useState, useMemo } from 'react';
import { copyToClipBoard } from 'config/utils';
import { getCopyStatusMessage } from './utils';

const RoomSettings = () => {
  const [copyStatus, setCopyStatus] = useState(null);

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
    <button type="button" onClick={handleCopyLinkToClipboard}>
      Skopiuj link do pokoju {copyStatusMessage}
    </button>
  );
};

export default RoomSettings;
