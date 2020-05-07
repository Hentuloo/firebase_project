import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { InputNumber, CircleButton } from 'components/atoms';

import repeatIcon from 'assets/svg/icons/repeatIcon.svg';
import chartIcon from 'assets/svg/icons/chartIcon.svg';
import { typingStatus } from 'hooks/useInputSpeedTest/types';
import { useDispatch } from 'react-redux';
import { updateSnaps } from 'store/actions/soloTraining';

const Wrapper = styled.div`
  display: grid;
  grid-row: 2 / span 1;
  grid-auto-flow: column;
  justify-items: center;
  margin-top: 10px;
  ${({ theme }) => theme.mediaQuery.md} {
    height: 190px;
    grid-row: 1 / span 1;
    grid-auto-flow: row;
    margin-top: 70px;
    justify-items: end;
    align-self: center;
  }
`;
const ControllerWrapper = styled.div`
  position: relative;
`;
const StyledCircleButton = styled(CircleButton)`
  display: grid;
  font-size: ${({ theme }) => theme.fs.xl};
`;
const ClockIcon = styled.span`
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(0%, 40%);
  font-size: ${({ theme }) => theme.fs.s};
  border-radius: 50%;
  opacity: 0.2;
  z-index: -5;
  transition: transform 0.3s ease-in;
`;
const StyledInputNumber = styled(InputNumber)`
  background-color: ${({ theme }) => theme.color.white[0]};
  &:hover,
  &:active,
  &:focus {
    & ~ ${ClockIcon} {
      transform: translate(110%, -60%);
    }
  }
`;
const StyledRepeat = styled(StyledCircleButton)``;
const StyledCharts = styled(StyledCircleButton)``;
const ButtonImage = styled.img`
  display: block;
  margin: 0px auto;
`;

export interface ControllersProps {
  accuracy: number;
  speed: number;
  initTime: number;
  timeStep: number;
  setTime: (props: number) => any;
  reset: () => any;
  gameStatus: typingStatus;
  stepsInOneMinute?: number;
}

export const Controllers: FC<ControllersProps> = ({
  initTime,
  timeStep,
  setTime,
  reset,
  gameStatus,
  stepsInOneMinute = 60,
  accuracy,
  speed,
}) => {
  const dispatch = useDispatch();
  const handleSetTime = (num: number) =>
    setTime(num * stepsInOneMinute);

  useEffect(() => {
    if (gameStatus === typingStatus.END) {
      dispatch(updateSnaps({ time: initTime, accuracy, speed }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus]);

  return (
    <Wrapper>
      <ControllerWrapper>
        <StyledInputNumber
          insertBefore={[0.5]}
          min={1}
          max={12}
          value={timeStep}
          onChange={handleSetTime}
          title="Ustaw czas [CTR+&uarr;&darr;]"
          disable={gameStatus === typingStatus.TYPING}
        />
        <ClockIcon className="fa fa-clock-o" aria-hidden="true" />
      </ControllerWrapper>
      <ControllerWrapper>
        <StyledRepeat onClick={reset} title="Zresetuj [CTR+R]">
          <ButtonImage src={repeatIcon} alt="Zresetuj stan gry " />
        </StyledRepeat>
      </ControllerWrapper>
      <ControllerWrapper>
        <StyledCharts title="Wykresy">
          <ButtonImage
            src={chartIcon}
            alt="Pokaż historie na wykresie"
          />
        </StyledCharts>
      </ControllerWrapper>
    </Wrapper>
  );
};
