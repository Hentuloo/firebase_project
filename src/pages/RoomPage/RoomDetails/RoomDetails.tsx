import React, { FC, useState, useCallback } from 'react';
import styled from 'styled-components';
import { BarDecorator } from 'components/atoms';
import { toast } from 'react-toastify';
import {
  RoomDetailsCard,
  RoomDetailsCardProps,
} from './RoomDetailsCard';
import { RoomControllers } from './RoomControllers';

const Wrapper = styled.div`
  display: grid;
  width: 90%;
  max-width: 300px;
  grid-row-gap: 40px;
  text-align: center;
  margin: 0px auto;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-row: 1 / span 2;
    align-self: center;
  }
`;
const RoomTitle = styled.h2`
  ${BarDecorator};
  font-weight: ${({ theme }) => theme.fw[1]};
`;

export interface RoomDetailsProps
  extends Omit<RoomDetailsCardProps, 'showPlayersOnMobile'> {
  title: string;
  copyToClipboard: () => void;
}

const RoomDetails: FC<RoomDetailsProps> = ({
  users,
  title,
  copyToClipboard,
  isCreator,
  onStartGame,
}) => {
  const [showPlayersOnMobile, setShowPlayersOnMobile] = useState(
    false,
  );

  const handleTogglePlayersViewOnMobile = useCallback(() => {
    setShowPlayersOnMobile(!showPlayersOnMobile);
  }, [showPlayersOnMobile]);

  const handleCopyToRoomLink = useCallback(() => {
    copyToClipboard();
  }, [copyToClipboard]);

  const handleOpenSettingsView = useCallback(() => {
    toast.success('Ta funkcjonalność jest w trakcie wdrażania');
  }, []);

  return (
    <Wrapper>
      <RoomTitle>{title}</RoomTitle>
      <RoomDetailsCard
        users={users}
        showPlayersOnMobile={showPlayersOnMobile}
        isCreator={isCreator}
        onStartGame={onStartGame}
      />
      <RoomControllers
        onExit={() => null}
        copyLink={handleCopyToRoomLink}
        showPlayers={handleTogglePlayersViewOnMobile}
        settings={handleOpenSettingsView}
      />
    </Wrapper>
  );
};

export default RoomDetails;
