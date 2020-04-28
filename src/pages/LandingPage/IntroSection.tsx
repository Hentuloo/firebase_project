import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

import { Constants } from 'config/Constants';

const Wrapper = styled.section`
  position: relative;
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-columns: 80px 150px 1fr;
  grid-template-rows: 90px 130px 1fr 170px;
  overflow: hidden;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-template-columns: 100px 80px 150px 40px 1fr 200px;
    grid-template-rows: 140px 160px 1fr 100px;
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    grid-template-columns: 100px 80px 190px 40px 1fr 120px 200px;
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    grid-template-columns: 170px 120px 280px 40px 1fr 120px 200px;
  }
`;
const LogoWrapper = styled.div`
  width: 85%;
  padding: 10px 0px 10px 10px;
  margin: 0px auto;
  ${({ theme }) => theme.mediaQuery.vlg} {
    padding: 20px 0px 20px 30px;
  }
`;
const LogoImage = styled.img`
  max-width: 100%;
`;

const HeaderText = styled.p`
  grid-column: 2 / span 1;
  grid-row: 2 / span 1;
  font-size: ${({ theme }) => theme.fs.large};
  ${({ theme }) => theme.mediaQuery.md} {
    grid-column: 3 / span 1;
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    font-size: 3.2em;
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    font-size: 4.2em;
  }
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
  bottom: 10%;
  padding: 14px 20px 10px 80px;
  transform: translate(60%, 0%);
  z-index: 10;
  ${({ theme }) => theme.mediaQuery.md} {
    bottom: 4%;
  }
`;
const ArrowSVG = styled.img`
  margin: 0px auto;
  height: 19px;
  ${({ theme }) => theme.mediaQuery.md} {
    height: 34px;
  }
`;
const ButtonWrapper = styled(Link)`
  display: grid;
  grid-column: -1 / -3;
  grid-row: -1 / -2;
  justify-items: center;
  align-items: center;
  z-index: 10;
  font-size: ${({ theme }) => theme.fs.xs};
  text-decoration: none;
  ${({ theme }) => theme.mediaQuery.md} {
    font-size: ${({ theme }) => theme.fs.m};
    align-items: flex-start;
  }
`;

const TextMockImage = styled.img`
  display: none;
  ${({ theme }) => theme.mediaQuery.md} {
    display: block;
    max-width: 80vw;
    grid-column: 5 / -1;
    grid-row: 2 / span 1;
    z-index: -2;
    opacity: 0.2;
    margin: 0px auto;
    transform: translate(0%, -75%);
    width: 42vw;
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    max-width: 600px;
    transform: translate(0%, -40%);
  }
`;
const RaceImage = styled.img`
  max-width: 120vw;
  grid-column: -1 / -3;
  grid-row: 1 / 2;
  margin-left: auto;
  transform: translate(0%, 22%) rotate(-35deg);
  ${({ theme }) => theme.mediaQuery.md} {
    width: 1000px;
    transform: translate(10%, -5%) rotate(0deg);
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    grid-column: 5 / -1;
    transform: translate(15%, 4%) rotate(0deg);
  }
`;
const LeavesImage = styled.img`
  max-width: 110vw;
  grid-column: 1 / span 1;
  grid-row: -1 / -3;
  align-self: flex-end;
  opacity: 0.3;
  ${({ theme }) => theme.mediaQuery.md} {
    width: 550px;
    margin-left: 40px;
    margin-bottom: 40px;
    opacity: 1;
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    width: 650px;
  }
`;

const IntroSection: FC = () => {
  const handleScrollPage = (e: any) => {
    e.preventDefault();
    window.scrollTo({
      top: window.innerHeight - 90,
      behavior: 'smooth',
    });
  };

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
      <ButtonWrapper to={Constants.paths.login.path}>
        <ButtonWithBar as="span">Nowe konto</ButtonWithBar>
      </ButtonWrapper>
      <TextMockImage src={textMockSVG} />
      <RaceImage src={carsRaceSVG} />
      <LeavesImage src={leavesSVG} />
      <ArrowButton title="Przejdź dalej" onClick={handleScrollPage}>
        <span className="sr-only">Przejdź dalej</span>
        <ArrowSVG src={arrowSVG} />
      </ArrowButton>
    </Wrapper>
  );
};

export default IntroSection;
