import React, { FC, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import WithMenuTemplate from 'templates/WithMenuTemplate';
import { ProfileImage, ClearButton } from 'components/atoms';
import { Constants } from 'config/Constants';
import { SummaryPanel } from 'components/organisms';
import { WithBackgroundTemplate } from 'templates/WithBackgroundTemplate';
import { useSelector, useDispatch } from 'react-redux';
import { getLinkToStoredRoom } from 'store/selectors/rooms.selector';
import { toast } from 'react-toastify';
import { useRedirect } from 'hooks/useRedirect';
import { setSavedRoomUrl } from 'store/actions/rooms.actions';
import { RoomsCard } from './RoomsCard';

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 75px;
  overflow: hidden;
  ${({ theme }) => theme.mediaQuery.md} {
    padding: 15px 0px;
    grid-template-columns: repeat(3, 1fr);
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    padding: 40px 0px;
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    padding: 70px 0px;
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
const StyledClearButton = styled(ClearButton)`
  text-decoration: underline;
`;

const MainPage: FC = () => {
  const dispatch = useDispatch();
  const link = useSelector(getLinkToStoredRoom);
  const redirect = useRedirect();

  const moveToRoomFromClipboard = useCallback(() => {
    redirect(Constants.paths.joinRoom.path + link);
  }, [link, redirect]);

  useEffect(() => {
    if (link) {
      toast(
        () => (
          <StyledClearButton onClick={moveToRoomFromClipboard}>
            Przejdź do pokoju z zaproszenia
          </StyledClearButton>
        ),
        {
          autoClose: 4000,
          closeOnClick: true,
          hideProgressBar: true,
        },
      );
      dispatch(setSavedRoomUrl(null));
    }
  }, [dispatch, link, moveToRoomFromClipboard]);

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
