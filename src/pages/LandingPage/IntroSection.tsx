import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  BarDecorator,
  RoundButton,
  ClearButton,
} from 'components/atoms';
import logoSVG from 'assets/svg/icons/logo.svg';
import carsRaceSVG from 'assets/svg/road/carsRaceFirst.svg';
import leavesSVG from 'assets/svg/leaves.svg';
import arrowSVG from 'assets/svg/icons/arrow-white.svg';

import { Constants } from 'config/Constants';
import { DarkModeButton } from 'components/molecules/DarkModeButton';
import { DemoTyingInput } from './DemoTyingInput';

const Wrapper = styled.section`
  position: relative;
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-columns: 80px 150px 1fr;
  grid-template-rows: 90px 190px 1fr 170px;
  overflow: hidden;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-template-columns: 100px 80px 150px 40px 1fr 200px;
    grid-template-rows: 140px 190px 1fr 100px;
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    grid-template-columns: 100px 80px 190px 40px 1fr 120px 200px;
    grid-template-rows: 140px 240px 1fr 100px;
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

const HeaderText = styled.div`
  grid-column: 2 / span 1;
  grid-row: 2 / span 1;
  font-size: ${({ theme }) => theme.fs.large};
  ${({ theme }) => theme.mediaQuery.md} {
    grid-column: 3 / span 2;
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    font-size: 3.2em;
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    font-size: 3.8em;
  }
  span {
    display: block;

    ${({ theme }) => theme.mediaQuery.vlg} {
      line-height: 105%;
    }
  }
  p {
    min-width: 300px;
    padding-top: 15px;
    ${({ theme }) => theme.mediaQuery.vlg} {
      min-width: 400px;
    }
  }
`;
const SmallText = styled.p`
  max-width: 300px;
  grid-column: 2 / span 1;
  grid-row: 3 / span 1;
  font-size: 16px;
  text-align: left;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-column: 3 / span 3;
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    max-width: 400px;
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    font-size: 22px;
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
const NewAccountButton = styled(ClearButton)`
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
const NewAccountButtonContent = styled.span`
  ${BarDecorator}
`;

const RaceImage = styled.img`
  position: absolute;
  bottom: 12%;
  left: 22%;
  transform: rotate(-35deg);
  z-index: -1;
  ${({ theme }) => theme.mediaQuery.md} {
    left: 5%;
    position: relative;
    max-width: 120vw;
    grid-column: -1 / -3;
    grid-row: 1 / 2;
    margin-left: auto;
    width: 1000px;
    transform: translate(10%, -5%) rotate(0deg);
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    grid-column: 5 / -1;
    transform: translate(15%, -4%) rotate(0deg);
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    grid-column: 5 / -1;
    transform: translate(15%, 8%) rotate(0deg);
  }
`;
const LeavesImage = styled.img`
  max-width: 110vw;
  grid-column: 1 / span 1;
  grid-row: -1 / -3;
  align-self: flex-end;
  opacity: 0.3;
  z-index: -22;
  ${({ theme }) => theme.mediaQuery.md} {
    width: 550px;
    margin-left: 40px;
    margin-bottom: 40px;
    opacity: 0.6;
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    opacity: 1;
    width: 650px;
  }
`;
const StyledDarkModeButton = styled(DarkModeButton)`
  position: absolute;
  right: 5px;
  top: 5px;
  ${({ theme }) => theme.mediaQuery.lg} {
    right: 25px;
    top: 15px;
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
      <StyledDarkModeButton />
      <LogoWrapper>
        <LogoImage src={logoSVG} />
      </LogoWrapper>
      <HeaderText>
        <span>Pisz</span>
        <span>Rywalizuj</span>
        <WithBar>Ucz się!</WithBar>
      </HeaderText>
      <SmallText>
        Naucz się szybkiego pisania, rywalizuj online, obserwuj
        postępy
      </SmallText>
      <NewAccountButton
        as={Link}
        to={Constants.paths.createAccount.path}
      >
        <NewAccountButtonContent>Zaloguj się</NewAccountButtonContent>
      </NewAccountButton>
      <DemoTyingInput />
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
