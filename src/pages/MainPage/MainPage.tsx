import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import WithMenuTemplate from 'templates/WithMenuTemplate';

// import { useStoredRoom } from 'hooks/useStoredRoom';
import { ProfileImage } from 'components/atoms';
import { Constants } from 'config/Constants';
import { RoomsPanel, SummaryPanel } from 'components/organisms';
// import Dashboard from './Dashboard';

import cornerSVG from 'assets/svg/road/corner2.svg';

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
const BackgroundImage = styled.img`
  position: fixed;
  width: 800px;
  bottom: 0%;
  right: 0%;
  transform: rotate(-12deg) translate(15%, 50%);
  z-index: -5;
  opacity: 0.3;
  ${({ theme }) => theme.mediaQuery.md} {
    opacity: 0.7;
  }
`;

const MainPage: FC = () => {
  // const [isActiveRoomId, redirect] = useStoredRoom();

  return (
    <WithMenuTemplate>
      <Wrapper>
        <CircleLink to={Constants.paths.settings.path}>
          <span className="sr-only">Przejdź do ustawień</span>
          <ProfileImage />
        </CircleLink>
        <RoomsPanel />
        <SummaryPanel />
        {/* {isActiveRoomId && (
          <button type="button" onClick={redirect}>
            Przejdź do pokoju z linku
          </button>
        )}
         <Dashboard /> */}
        <BackgroundImage src={cornerSVG} />
      </Wrapper>
    </WithMenuTemplate>
  );
};

export default MainPage;
