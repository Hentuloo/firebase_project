import React, { FC } from 'react';
import styled from 'styled-components';
import { TypingInput } from 'components/organisms';
import { useSelector } from 'react-redux';
import { getGameSettings } from 'store/selectors/gameSettings.selector';
import { TypingMood } from 'hooks/useInputSpeedTest/types';
import { LoadingBar } from 'components/atoms';
import { ControlGameInputProvider } from './ControlGameInputProvider';

export interface GameInputProps {
  roomId: string;
}

const StyledTypingInput = styled(TypingInput)`
  width: 100%;
  max-width: 700px;
  margin: 0px auto;
`;
const StyledLoadingBar = styled(LoadingBar)`
  width: 80%;
  height: 10px;
  max-width: 550px;
  align-self: end;
  margin: 0px auto;
`;
export const GameInput: FC<GameInputProps> = ({ roomId }) => {
  const { text } = useSelector(getGameSettings);

  return (
    <StyledTypingInput
      text={text || 'Lorem ipsum something'}
      gameType={TypingMood.MULTIPLAYER}
      withoutCounters
      render={state => (
        <>
          <ControlGameInputProvider
            inputState={state}
            roomId={roomId}
          />
          <StyledLoadingBar
            green
            easing="linear"
            duration={1}
            progress={Number(
              (
                (state.timeSteps / state.initialTimeSteps) *
                100
              ).toFixed(2),
            )}
          />
        </>
      )}
    />
  );
};
