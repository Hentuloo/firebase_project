import React, { FC } from 'react';
import styled from 'styled-components';
import { TypingInput } from 'components/organisms';

import arrowSVG from 'assets/svg/longArrow.svg';

const Wrapper = styled.div`
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
  top: calc(100% - 50px);
  left: 50%;
  position: absolute;
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
        text="jak dobrze piszesz na klawiaturze? czy ten tekst nie sprawja ci problemów? Zaloguj się i sprawdź swoją prędkość"
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
