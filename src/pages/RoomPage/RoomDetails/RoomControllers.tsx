import React, { FC } from 'react';
import styled from 'styled-components';
import { CircledButtonWithImage } from 'components/atoms/Button/CircledButtonWithImage';
import exitDoor from 'assets/svg/icons/exitDoor.svg';
import clipboard from 'assets/svg/icons/clipboard.svg';
import person from 'assets/svg/icons/person.svg';
import moreIcon from 'assets/svg/icons/more.svg';
import { Constants } from 'config/Constants';

const Wrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-items: center;
`;

const StyledPersonButton = styled(CircledButtonWithImage)`
  ${({ theme }) => theme.mediaQuery.md} {
    display: none;
  }
`;
const StyledSettingsButton = styled(CircledButtonWithImage)`
  display: none;
  ${({ theme }) => theme.mediaQuery.md} {
    display: block;
  }
`;

export interface RoomControllersProps {
  onExit: () => void;
  copyLink: () => void;
  showPlayers: () => void;
  settings: () => void;
}

export const RoomControllers: FC<RoomControllersProps> = ({
  onExit,
  copyLink,
  showPlayers,
  settings,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <StyledSettingsButton
        title="Pokaż ustawienia pokoju"
        onClick={settings}
        src={moreIcon}
        alt="Ustawienia"
        disabled
      />
      <StyledPersonButton
        title="Pokaż osoby w pokoju"
        onClick={showPlayers}
        src={person}
        alt="Gracze"
      />
      <CircledButtonWithImage
        title="Kopiuj link do pokoju"
        onClick={copyLink}
        src={clipboard}
        alt="kopiuj"
      />
      <CircledButtonWithImage
        to={Constants.paths.dashboard.path}
        title="Wyjdź z pokoju"
        onClick={onExit}
        src={exitDoor}
        alt="Powrót"
      />
    </Wrapper>
  );
};
