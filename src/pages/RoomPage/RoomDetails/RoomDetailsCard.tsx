import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { stickyModal } from 'components/molecules';
import { UserLabel } from 'components/molecules/UserLabel';
import { FilledButton } from 'components/atoms';

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
    photoURL: string;
  }[];
  showPlayersOnMobile: boolean;
  isCreator: boolean;
}

export const RoomDetailsCard: FC<RoomDetailsCardProps> = ({
  users,
  showPlayersOnMobile,
  isCreator,
  ...props
}) => {
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
      {users.length > 1 && isCreator && (
        <StyledFilledButton>Start!</StyledFilledButton>
      )}
    </Wrapper>
  );
};
