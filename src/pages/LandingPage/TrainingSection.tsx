import React, { FC } from 'react';
import styled from 'styled-components';

import {
  TextGroup,
  TextGroupHeader,
  TipSection,
  TipBold,
} from 'components/atoms';

import chartSVG from 'assets/svg/ilustrations/drawChart.svg';

const Wrapper = styled.section`
  margin-top: 60px;
  ${({ theme }) => theme.mediaQuery.md} {
    max-width: 1000px;
    margin: 100px 5vw 0px auto;
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: 100px 170px;
  }
  ${({ theme }) => theme.mediaQuery.md} {
    margin: 150px 5vw 0px auto;
  }
`;
const StatisticImage = styled.img`
  display: none;
  ${({ theme }) => theme.mediaQuery.md} {
    width: 90%;
    grid-column: 2 / -1;
    grid-row: 1 / -1;
    margin-left: auto;
    display: block;
  }
`;
const StyledTextGroup = styled(TextGroup)`
  ${({ theme }) => theme.mediaQuery.md} {
    grid-column: 1 / 2;
    grid-row: 2 / -1;
  }
`;
const StyledTextGroupHeader = styled(TextGroupHeader)`
  &::after {
    transform: translate(-140%, -110%);
  }
`;

const MultiplayerSection: FC = () => {
  return (
    <Wrapper>
      <StatisticImage src={chartSVG} />
      <StyledTextGroup>
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
      </StyledTextGroup>
    </Wrapper>
  );
};

export default MultiplayerSection;
