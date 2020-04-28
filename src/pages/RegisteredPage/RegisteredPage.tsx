import React, { FC } from 'react';
import styled from 'styled-components';

import backgroundImage from 'assets/svg/road/corner1.svg';

import IntroductionText from './IntroductionText';
import Links from './Links';

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  max-width: 1200px;
  height: 100vh;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-row-gap: 15px;
  margin: 0px auto;
  padding: 15px 0px 20px;

  ${({ theme }) => theme.mediaQuery.md} {
    padding: 35px 0px 20px;
    grid-row-gap: 10px;
  }
`;

const BackGroundImage = styled.img`
  position: fixed;
  right: 0%;
  top: 0%;
  width: 250vw;
  transform: translate(44%, -25%) rotate(-25deg);
  z-index: -5;
  opacity: 0.2;
  ${({ theme }) => theme.mediaQuery.md} {
    width: 100vw;
    max-width: 1200px;
    transform: translate(20%, -15%) rotate(-10deg);
    opacity: 1;
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    max-width: 1500px;
    transform: translate(30%, -15%) rotate(0deg);
  }
`;

const RegisteredPage: FC = () => {
  return (
    <Wrapper>
      <IntroductionText />
      <Links />
      <BackGroundImage src={backgroundImage} />
    </Wrapper>
  );
};

export default RegisteredPage;
