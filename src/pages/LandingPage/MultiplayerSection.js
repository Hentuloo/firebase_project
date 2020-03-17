import React from 'react';
import styled from 'styled-components';

import {
  TextGroup,
  TextGroupHeader,
  TipSection,
  TipBold,
} from 'components/atoms';

import raceSVG from 'assets/svg/ilustrations/startRace.svg';

const Wrapper = styled.section`
  ${({ theme }) => theme.mediaQuery.md} {
    max-width: 1150px;
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: 100px 170px;
  }
`;
const RaceImage = styled.img`
  width: 90vw;
  transform: translate(0%, -10%);
  margin-bottom: -20px;
  ${({ theme }) => theme.mediaQuery.md} {
    max-width: 640px;
    grid-column: 1 / span 1;
    grid-row: 1 / -1;
    transform: translate(0%, -20%);
    width: 50vw;
  }
`;
const StyledTextGroup = styled(TextGroup)`
  ${({ theme }) => theme.mediaQuery.md} {
    grid-column: 2 / -1;
    grid-row: 2 / -1;
  }
`;
const StyledTextGroupHeader = styled(TextGroupHeader)`
  &::after {
    transform: translate(-50%, 0%);
  }
`;

const MultiplayerSection = () => {
  return (
    <Wrapper>
      <RaceImage src={raceSVG} />
      <StyledTextGroup>
        <StyledTextGroupHeader>
          Opcja Multiplayer
        </StyledTextGroupHeader>
        <p>
          Dołącz do pokoju i zacznij wyścig: wygrywa osoba która jako
          pierwsza przepisze wskazany tekst.
        </p>
        <TipSection>
          <TipBold>Tip: </TipBold>
          <p>
            Sam stwórz pokój i udostępnij link do pokoju by zaprość
            znajomych
          </p>
        </TipSection>
      </StyledTextGroup>
    </Wrapper>
  );
};

export default MultiplayerSection;
