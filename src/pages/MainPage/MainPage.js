import React from 'react';
import styled from 'styled-components';
import WithMenuTemplate from 'templates/WithMenuTemplate';

import { useStoredRoom } from 'hooks/useStoredRoom';
import RoomsPanel from './RoomsPanel';
import Dashboard from './Dashboard';

const Wrapper = styled.div`
  display: grid;
  width: 600px;
`;

const MainPage = () => {
  const [isActiveRoomId, redirect] = useStoredRoom();

  return (
    <WithMenuTemplate>
      <Wrapper>
        {isActiveRoomId && (
          <button type="button" onClick={redirect}>
            Przejdź do pokoju z linku
          </button>
        )}
        <RoomsPanel />
        <Dashboard />
      </Wrapper>
    </WithMenuTemplate>
  );
};

export default MainPage;
