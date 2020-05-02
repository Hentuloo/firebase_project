import React, { useState, useMemo, FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { copyToClipBoard } from 'utils';
import { Constants } from 'config/Constants';
import { getCopyStatusMessage } from '../utils';

const Wrapper = styled.div``;

const RoomSettings: FC = () => {
  const [copyStatus, setCopyStatus] = useState<boolean | null>(null);

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
      <button type="button" onClick={handleCopyLinkToClipboard}>
        Skopiuj link do pokoju {copyStatusMessage}
      </button>
      <Link to={Constants.paths.root.path}>Wyjdź z pokoju</Link>
    </Wrapper>
  );
};

export default RoomSettings;
