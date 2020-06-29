import React, { FC, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { stickyModal } from 'components/molecules';
import { FilledButton } from 'components/atoms';
import { useSelector } from 'react-redux';
import {
  getGameStatusRequestFlag,
  getGameStartTimestamp,
  getFinalResults,
  getRegisteredUserInArray,
} from 'store/selectors/gameSettings.selector';
import { PlayersList } from './PlayersList';

const Wrapper = styled.div`
  display: block;
  width: 100%;
  ${({ theme }) => theme.mediaQuery.md} {
    ${stickyModal};
    display: grid;
    max-width: 270px;
    min-height: 300px;
    align-items: flex-start;
    grid-row-gap: 15px;
    padding: 15px 20px;
  }
`;
const StyledFilledButton = styled(FilledButton)`
  width: 70%;
  align-self: end;
`;
const StyledPlayersList = styled(PlayersList)`
  display: none;
  ${({ theme }) => theme.mediaQuery.md} {
    display: block;
  }
  ${({
    showPlayersOnMobileView,
  }: {
    showPlayersOnMobileView?: boolean;
  }) =>
    showPlayersOnMobileView &&
    css`
      display: block;
      ${({ theme }) => theme.mediaQuery.md} {
        display: block;
      }
    `}
`;
const SmallText = styled.span`
  display: block;
  align-self: end;
  font-size: ${({ theme }) => theme.fs.xxs};
  color: ${({ theme }) => theme.color.gray[1]};
`;

export interface RoomDetailsCardProps {
  showPlayersOnMobile: boolean;
  isCreator: boolean;
  onStartGame: () => void;
}

export const RoomDetailsCard: FC<RoomDetailsCardProps> = ({
  showPlayersOnMobile,
  isCreator,
  onStartGame,
  ...props
}) => {
  const regiteredUsers = useSelector(getRegisteredUserInArray);
  const gameStartRequest = useSelector(getGameStatusRequestFlag);
  const startTimestamp = useSelector(getGameStartTimestamp);
  const results = useSelector(getFinalResults);

  const showStartButtonFlag = useMemo(
    () =>
      (regiteredUsers.length > 1 &&
        isCreator &&
        startTimestamp === null) ||
      (results && regiteredUsers.length > 1 && isCreator),
    [isCreator, results, startTimestamp, regiteredUsers.length],
  );
  const showBeforeStartMessage = useMemo(
    () => (startTimestamp === null || results) && !isCreator,
    [isCreator, results, startTimestamp],
  );

  return (
    <Wrapper {...props}>
      <StyledPlayersList
        showPlayersOnMobileView={showPlayersOnMobile}
        players={regiteredUsers}
      />
      {regiteredUsers.length === 1 && (
        <SmallText>
          Aby rozpocząć potrzeba minimum dwóch graczy.
        </SmallText>
      )}
      {showBeforeStartMessage && (
        <SmallText>
          Grę może uruchomić tylko założyciel pokoju
        </SmallText>
      )}
      {showStartButtonFlag && (
        <StyledFilledButton
          disabled={gameStartRequest === true}
          onClick={onStartGame}
        >
          Start!
        </StyledFilledButton>
      )}
    </Wrapper>
  );
};
