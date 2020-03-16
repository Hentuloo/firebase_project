import React from 'react';
import styled, { css } from 'styled-components';

import radialSVG from 'assets/svg/radial.svg';
import lineSVG from 'assets/svg/road/line1.svg';

import IntroSection from './IntroSection';
import MultiplayerSection from './MultiplayerSection';
import TrainingSection from './TrainingSection';
import LevelsSection from './LevelsSection';
import FootherSection from './FootherSection';

const Wrapper = styled.main`
  position: relative;
  width: 100%;
  overflow: hidden;
`;
const RadialImage = styled.img`
  position: absolute;
  max-width: 100%;
  top: 100vh;
  left: 0%;
  transform: translate(0%, -50%);
  z-index: -1;
`;

const LineImageStyle = css`
  position: absolute;
  max-width: 160%;
  left: 0%;
  transform: translate(-30%, -50%);
  z-index: -2;
`;
const LineImage = styled.img`
  ${LineImageStyle}
  top: 185vh;
`;
const GrayLineImage = styled.img`
  ${LineImageStyle}
  top: 245vh;
  transform: translate(-30%, -50%) rotate(-10deg);
  filter: grayscale(1);
`;

const AboutPage = () => {
  return (
    <Wrapper>
      <IntroSection />
      <RadialImage src={radialSVG} />;
      <MultiplayerSection />
      <TrainingSection />
      <LineImage src={lineSVG} />;
      <GrayLineImage src={lineSVG} />;
      <LevelsSection />
      <FootherSection />
    </Wrapper>
  );
};

export default AboutPage;
