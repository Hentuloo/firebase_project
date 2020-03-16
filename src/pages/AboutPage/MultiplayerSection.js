import React from 'react';
import styled from 'styled-components';

import {
  TextGroup,
  TextGroupHeader,
  TipSection,
  TipBold,
} from 'components/atoms';

import raceSVG from 'assets/svg/ilustrations/startRace.svg';

const Wrapper = styled.section``;
const RaceImage = styled.img`
  width: 90vw;
  transform: translate(0%, -10%);
  margin-bottom: -20px;
`;

const MultiplayerSection = () => {
  return (
    <Wrapper>
      <RaceImage src={raceSVG} />
      <TextGroup>
        <TextGroupHeader>Opcja Multiplayer</TextGroupHeader>
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
      </TextGroup>
    </Wrapper>
  );
};

export default MultiplayerSection;
