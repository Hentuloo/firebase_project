import React, { FC } from 'react';
import styled from 'styled-components';
import { TypingInput } from 'components/organisms';

import arrowSVG from 'assets/svg/longArrow.svg';

const Wrapper = styled.div`
  position: relative;
  display: none;
  ${({ theme }) => theme.mediaQuery.md} {
    display: block;
    max-width: 80vw;
    grid-column: 5 / -1;
    grid-row: 2 / span 1;
    z-index: 2;
    margin: 0px auto;
    transform: translate(0%, -75%);
    width: 45vw;
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    max-width: 800px;
    transform: translate(0%, -40%);
  }
`;

const StyledTypingInput = styled(TypingInput)`
  width: 100%;
`;
const ArrowWrapper = styled.div`
  position: absolute;
  top: 110px;
  left: 50%;
  transform: translate(-80%, 0%);
`;
const ArrowImage = styled.img``;
const ArrowText = styled.span`
  position: absolute;
  display: block;
  min-width: 140px;
  left: 100%;
  top: 60%;
`;
export interface DemoTyingInputProps {}
export const DemoTyingInput: FC<DemoTyingInputProps> = ({
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <StyledTypingInput
        text={`"Litwo! Ojczyzno moja! ty jesteś jak zdrowie. Ile cię trzeba cenić, ten tylko się dowie, Kto cię stracił." Zaloguj się i sprawdź swoją prędkość pisania`}
        withoutCounters
      />
      <ArrowWrapper>
        <ArrowImage
          src={arrowSVG}
          alt="strzałka, wskazująca pole do pisania"
        />
        <ArrowText>Wprowadź tekst</ArrowText>
      </ArrowWrapper>
    </Wrapper>
  );
};
