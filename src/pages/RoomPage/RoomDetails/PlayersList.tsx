import React, { FC } from 'react';
import { UserLabel } from 'components/molecules/UserLabel/UserLabel';
import { UserLabelInfo } from 'types/GameSettings';

export interface PlayersListProps {
  players: UserLabelInfo[];
  className?: string;
}

export const PlayersList: FC<PlayersListProps> = ({
  players,
  className,
}) => {
  return (
    <div className={className}>
      {players.map(
        ({ uid, photoURL, displayName, isCreator, wins }) => (
          <UserLabel
            key={uid}
            photoURL={photoURL}
            displayName={displayName}
            isCreator={isCreator}
            wins={wins}
          />
        ),
      )}
    </div>
  );
};
