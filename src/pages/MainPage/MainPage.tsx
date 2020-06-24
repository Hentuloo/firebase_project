import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import WithMenuTemplate from 'templates/WithMenuTemplate';

import { ProfileImage } from 'components/atoms';
import { Constants } from 'config/Constants';
import { SummaryPanel } from 'components/organisms';
import { WithBackgroundTemplate } from 'templates/WithBackgroundTemplate';
import { RoomsCard } from './RoomsCard';

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

const CircleLinkOnMobile = styled(Link)`
  grid-column: 2 / span 1;
  padding: 5px;
  ${({ theme }) => theme.mediaQuery.md} {
    display: none;
  }
`;
const StyledSummaryPanel = styled(SummaryPanel)`
  grid-row: 2 / span 1;
  margin-top: 40px;
  ${({ theme }) => theme.mediaQuery.md} {
    margin-top: 0px;
  }
`;

const MainPage: FC = () => {
  // const [isActiveRoomId, redirect] = useStoredRoom();

  // useEffect(() => {
  //   if (isActiveRoomId) {
  //     toast(() => <button type="button">Przejdź do pokoju</button>);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <WithMenuTemplate>
      <WithBackgroundTemplate type={1}>
        <Wrapper>
          <CircleLinkOnMobile to={Constants.paths.settings.path}>
            <span className="sr-only">Przejdź do ustawień</span>
            <ProfileImage />
          </CircleLinkOnMobile>
          <RoomsCard />
          <StyledSummaryPanel />
        </Wrapper>
      </WithBackgroundTemplate>
    </WithMenuTemplate>
  );
};

export default MainPage;
