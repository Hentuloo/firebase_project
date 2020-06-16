import React, { FC } from 'react';
import styled from 'styled-components';
import { TypingInput } from 'components/organisms';
import { useSelector } from 'react-redux';
import { getGameSettings } from 'store/selectors/gameSettings.selector';
import { TypingMood } from 'hooks/useInputSpeedTest/types';
import { LigthsTimesModal } from './LigthsTimesModal';

export interface GameInputProps {}

const StyledTypingInput = styled(TypingInput)`
  width: 100%;
  max-width: 700px;
  margin: 0px auto;
`;
export const GameInput: FC<GameInputProps> = () => {
  const { text } = useSelector(getGameSettings);

  return (
    <StyledTypingInput
      text={text || 'Lorem ipsum something'}
      gameType={TypingMood.MULTIPLAYER}
      withoutCounters
      render={state => <LigthsTimesModal typingInputState={state} />}
    />
  );
};
