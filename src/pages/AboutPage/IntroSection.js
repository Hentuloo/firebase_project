import React from 'react';
import styled from 'styled-components';

import {
  ButtonWithBar,
  BarDecorator,
  RoundButton,
} from 'components/atoms';

import logoSVG from 'assets/svg/logo.svg';
import textMockSVG from 'assets/svg/svgText.svg';
import carsRaceSVG from 'assets/svg/road/carsRaceFirst.svg';
import leavesSVG from 'assets/svg/leaves.svg';
import arrowSVG from 'assets/svg/arrow-white.svg';

const Wrapper = styled.section`
  position: relative;
  display: grid;
  width: 100%;
  min-height: 100vh;
  grid-template-columns: 80px 150px 1fr;
  grid-template-rows: 90px 130px 1fr 100px;
  overflow: hidden;
`;
const LogoWrapper = styled.div`
  width: 85%;
  padding: 10px 0px 10px 10px;
  margin: 0px auto;
`;
const LogoImage = styled.img`
  max-width: 100%;
`;

const HeaderText = styled.p`
  grid-column: 2 / span 1;
  grid-row: 2 / span 1;
  font-size: ${({ theme }) => theme.fs.large};
  span {
    display: block;
  }
`;
const WithBar = styled.span`
  ${BarDecorator}
`;
const ArrowButton = styled(RoundButton)`
  position: absolute;
  right: 100%;
  bottom: 4%;
  padding: 14px 20px 10px 80px;
  transform: translate(60%, 0%);
  z-index: 10;
`;
const ArrowSVG = styled.img`
  margin: 0px auto;
  height: 19px;
`;
const ButtonWrapper = styled.div`
  display: grid;
  grid-column: -1 / -3;
  grid-row: -1 / -2;
  justify-items: center;
  align-items: center;
  z-index: 10;
`;

const TextMockImage = styled.img`
  display: none;
  max-width: 80vw;
  grid-column: 1 / -1;
  grid-row: -1 / -3;
  z-index: -2;
  opacity: 0.05;
  margin: 0px 10vw;
`;
const RaceImage = styled.img`
  max-width: 120vw;
  grid-column: -1 / -3;
  grid-row: 1 / 2;
  transform: translate(8%, 38%);
`;
const LeavesImage = styled.img`
  max-width: 110vw;
  grid-column: 1 / span 1;
  grid-row: -1 / -3;
  align-self: flex-end;
  opacity: 0.3;
`;

const IntroSection = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <LogoImage src={logoSVG} />
      </LogoWrapper>
      <HeaderText>
        <span>Pisz</span>
        <span>Rywalizuj</span>
        <WithBar>Ucz się!</WithBar>
      </HeaderText>
      <ButtonWrapper>
        <ButtonWithBar>Nowe konto</ButtonWithBar>
      </ButtonWrapper>
      <TextMockImage src={textMockSVG} />
      <RaceImage src={carsRaceSVG} />
      <LeavesImage src={leavesSVG} />
      <ArrowButton title="Przejdź dalej">
        <span className="sr-only">Przejdź dalej</span>
        <ArrowSVG src={arrowSVG} />
      </ArrowButton>
    </Wrapper>
  );
};

export default IntroSection;
