import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { InputNumber } from 'components/atoms';
import repeatIcon from 'assets/svg/icons/repeatIcon.svg';
import chartIcon from 'assets/svg/icons/chartIcon.svg';
import circles from 'assets/svg/circles1.svg';
import { TypingStatus } from 'hooks/useInputSpeedTest/types';
import gsap from 'gsap';
import { CircledButtonWithImage } from 'components/atoms/Button/CircledButtonWithImage';
import { AddSnap } from '../types';

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
const ClockWrapper = styled.div`
  position: relative;
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
const ChartButtonWrapper = styled.div`
  position: relative;
`;
const NewScoreAnimationImage = styled.img`
  position: absolute;
  display: block;
  top: 0%;
  left: 0%;
  z-index: -3;
  opacity: 0;
  transform: scale(0.9);
`;

export interface ControllersProps {
  accuracy: number;
  speed: number;
  initTime: number;
  timeStep: number;
  setTime: (props: number) => any;
  reset: () => any;
  gameStatus: TypingStatus;
  stepsInOneMinute?: number;
  changeTab: () => void;
  addSnap: AddSnap;
  disableCharts: boolean;
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
  changeTab,
  addSnap,
  disableCharts,
}) => {
  const chartAttentionCircles = useRef<HTMLImageElement>(null);

  const handleChangeTab = () => {
    if (gameStatus === TypingStatus.TYPING) return;
    changeTab();
  };
  const newChartAnim = () => {
    const el = chartAttentionCircles.current;
    const tl = gsap.timeline();
    tl.to(el, { opacity: 1, scale: 1.25 }, 1.9)
      .to(el, {
        opacity: 0,
      })
      .to(el, { scale: 0.9 });
  };

  const handleSetTime = (num: number) => {
    setTime(num * stepsInOneMinute);
  };

  useEffect(() => {
    if (gameStatus === TypingStatus.END) {
      addSnap(initTime, accuracy, speed);
      newChartAnim();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus]);

  return (
    <Wrapper>
      <ClockWrapper>
        <StyledInputNumber
          insertBefore={[0.5]}
          min={1}
          max={12}
          value={timeStep}
          onChange={handleSetTime}
          title="Ustaw czas [CTR+&uarr;&darr;]"
          disable={gameStatus === TypingStatus.TYPING}
        />
        <ClockIcon className="fa fa-clock-o" aria-hidden="true" />
      </ClockWrapper>
      <CircledButtonWithImage
        onClick={reset}
        title="Zresetuj [CTR+R]"
        alt="Zresetuj stan gry"
        src={repeatIcon}
      />
      <ChartButtonWrapper>
        <CircledButtonWithImage
          disabled={
            disableCharts || gameStatus === TypingStatus.TYPING
          }
          onClick={handleChangeTab}
          title="Wykresy"
          src={chartIcon}
          alt="Pokaż historie na wykresie"
        />
        <NewScoreAnimationImage
          ref={chartAttentionCircles}
          src={circles}
        />
      </ChartButtonWrapper>
    </Wrapper>
  );
};
