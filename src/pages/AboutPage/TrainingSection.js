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
  margin-top: 60px;
`;
const RaceImage = styled.img`
  display: none;
`;
const StyledTextGroupHeader = styled(TextGroupHeader)`
  &::after {
    transform: translate(-140%, -110%);
  }
`;

const MultiplayerSection = () => {
  return (
    <Wrapper>
      <RaceImage src={raceSVG} />
      <TextGroup>
        <StyledTextGroupHeader>Opcja TRENING</StyledTextGroupHeader>
        <p>
          Rozpocznij “Własny trenning” i poprawiaj swojego skilla wraz
          z praktyką! Dostępne są różne poziomy zawannsowania!
        </p>
        <TipSection>
          <TipBold>Tip: </TipBold>
          <p>
            Zacznij od poziomu “Adept” a system sam przełączy poziom
            gdy uzna że jesteś gotowy
          </p>
        </TipSection>
      </TextGroup>
    </Wrapper>
  );
};

export default MultiplayerSection;
