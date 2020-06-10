import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { stickyModal } from 'components/molecules';
import { UserLabel } from 'components/molecules/UserLabel';

interface WrapperProps {
  showOnMobile: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  ${stickyModal};
  display: none;
  max-width: 270px;
  min-height: 250px;
  grid-row-gap: 15px;
  padding: 15px 20px;
  ${({ theme }) => theme.mediaQuery.md} {
    display: grid;
    align-self: center;
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

export interface RoomDetailsCardProps {
  users: {
    uid: string;
    displayName: string;
    photoURL: string;
  }[];
  showPlayersOnMobile: boolean;
}

export const RoomDetailsCard: FC<RoomDetailsCardProps> = ({
  users,
  showPlayersOnMobile,
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
    </Wrapper>
  );
};
