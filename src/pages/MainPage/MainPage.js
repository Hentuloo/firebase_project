import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import WithMenuTemplate from 'templates/WithMenuTemplate';

// import { useStoredRoom } from 'hooks/useStoredRoom';
import { CircleImage } from 'components/atoms';
import { useSelector } from 'react-redux';
import { Constants } from 'config/Constants';
import RoomsPanel from './RoomsPanel';
// import Dashboard from './Dashboard';

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 75px;
  overflow: hidden;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 70px auto;
  }
`;
const CircleLink = styled(Link)`
  grid-column: 2 / span 1;
  padding: 5px;
  ${({ theme }) => theme.mediaQuery.md} {
    display: none;
  }
`;

const MainPage = () => {
  const { photoURL } = useSelector(store => store.user);
  // const [isActiveRoomId, redirect] = useStoredRoom();

  return (
    <WithMenuTemplate>
      <Wrapper>
        <CircleLink to={Constants.paths.settings.path}>
          <span className="sr-only">Przejdź do ustawień</span>
          <CircleImage src={photoURL} />
        </CircleLink>
        <RoomsPanel />

        {/* {isActiveRoomId && (
          <button type="button" onClick={redirect}>
            Przejdź do pokoju z linku
          </button>
        )}
         <Dashboard /> */}
      </Wrapper>
    </WithMenuTemplate>
  );
};

export default MainPage;
