import React, { FC, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { stickyModal } from 'components/molecules';
import { UserLabel } from 'components/molecules/UserLabel';
import { FilledButton } from 'components/atoms';
import { useSelector } from 'react-redux';
import {
  getGameStatusRequestFlag,
  getGameStartTimestamp,
  getFinalResults,
} from 'store/selectors/gameSettings.selector';

interface WrapperProps {
  showOnMobile: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  ${stickyModal};
  display: none;
  max-width: 270px;
  min-height: 300px;
  grid-row-gap: 15px;
  padding: 15px 20px;
  ${({ theme }) => theme.mediaQuery.md} {
    display: grid;
    align-items: flex-start;
  }
  ${({ showOnMobile }) =>
    showOnMobile &&
    css`
      display: grid;
      ${({ theme }) => theme.mediaQuery.md} {
        display: block;
      }
    `}
`;
const StyledFilledButton = styled(FilledButton)`
  width: 70%;
  align-self: end;
`;
const SmallText = styled.span`
  display: block;
  align-self: end;
  font-size: ${({ theme }) => theme.fs.xxs};
  color: ${({ theme }) => theme.color.gray[1]};
`;

export interface RoomDetailsCardProps {
  users: {
    uid: string;
    displayName: string;
    photoURL?: string;
  }[];
  showPlayersOnMobile: boolean;
  isCreator: boolean;
  onStartGame: () => void;
}

export const RoomDetailsCard: FC<RoomDetailsCardProps> = ({
  users,
  showPlayersOnMobile,
  isCreator,
  onStartGame,
  ...props
}) => {
  const gameStartRequest = useSelector(getGameStatusRequestFlag);
  const startTimestamp = useSelector(getGameStartTimestamp);
  const results = useSelector(getFinalResults);

  const showStartButtonFlag = useMemo(() => {
    const basicPermision = users.length > 1 && isCreator;
    const beforeStartOrAfterGame = startTimestamp === null || results;

    return basicPermision && beforeStartOrAfterGame;
  }, [isCreator, results, startTimestamp, users.length]);

  return (
    <Wrapper showOnMobile={showPlayersOnMobile} {...props}>
      {users.map(({ uid, photoURL, displayName }) => (
        <UserLabel
          key={uid}
          id={uid}
          photoURL={photoURL}
          displayName={displayName}
        />
      ))}
      {users.length === 1 && (
        <SmallText>
          Aby rozpocząć potrzeba minimum dwóch graczy.
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
