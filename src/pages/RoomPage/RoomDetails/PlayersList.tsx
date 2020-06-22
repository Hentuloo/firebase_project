import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { getRoomCreator } from 'store/selectors/gameSettings.selector';
import { UserLabel } from 'components/molecules/UserLabel/UserLabel';
import { UserWithUid } from 'types/GameSettings';

export interface PlayersListProps {
  players: UserWithUid[];
}

export const PlayersList: FC<PlayersListProps> = ({ players }) => {
  const creator = useSelector(getRoomCreator);

  return (
    <>
      {players.map(({ uid, photoURL, displayName }) => (
        <UserLabel
          key={uid}
          photoURL={photoURL}
          displayName={displayName}
          isCreator={creator === uid}
        />
      ))}
    </>
  );
};
