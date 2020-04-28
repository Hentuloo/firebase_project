import React, { FC } from 'react';
import styled from 'styled-components';
import { TipBold, TextGroupHeader } from 'components/atoms';

import {
  GroupWrapper,
  GroupItem,
  GroupImage,
  GroupTitle,
  GroupDescription,
  GroupImageWrapper,
} from 'components/molecules';

import level1 from 'assets/svg/levels/level1.svg';
import level2 from 'assets/svg/levels/level2.svg';
import level3 from 'assets/svg/levels/level3.svg';

const Wrapper = styled.section`
  margin-top: 70px;
  ${({ theme }) => theme.mediaQuery.md} {
    max-width: 1350px;
    margin: 120px auto 0px;
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    margin: 190px auto 0px;
    max-width: 1550px;
  }
  ${GroupImage} {
    max-width: 66%;
    ${({ theme }) => theme.mediaQuery.md} {
      top: 4%;
      max-width: 54%;
    }
  }
`;
const StyledHeader = styled(TextGroupHeader)`
  font-size: ${({ theme }) => theme.fs.xxxl};
  text-align: center;
  ${({ theme }) => theme.mediaQuery.md} {
    display: grid;
    width: 400px;
    margin: 60px 90px 60px auto;
  }
  &::after {
    transform: translate(10%, -110%);
    height: 50%;
  }
`;

const LevelsSection: FC = () => {
  return (
    <Wrapper>
      <StyledHeader>Dostępne poziomy:</StyledHeader>
      <GroupWrapper>
        <GroupItem>
          <GroupImageWrapper>
            <GroupImage src={level1} />
          </GroupImageWrapper>
          <GroupTitle>
            Adept: dla osób które podczas codziennej pracy zmuszeni są
            patrzeć na klawiaturę.
          </GroupTitle>
          <GroupDescription>
            ~<TipBold>40</TipBold>słów/minute
          </GroupDescription>
        </GroupItem>
        <GroupItem>
          <GroupImageWrapper>
            <GroupImage src={level2} />
          </GroupImageWrapper>
          <GroupTitle>
            Średniozawannsowany: dla osób które nie muszą patrzeć na
            klawiaturę, ale często się mylą i czasem potrzebują
            zastanowienia.
          </GroupTitle>
          <GroupDescription>
            ~<TipBold>80</TipBold>słów/minute
          </GroupDescription>
        </GroupItem>
        <GroupItem>
          <GroupImageWrapper>
            <GroupImage src={level3} />
          </GroupImageWrapper>
          <GroupTitle>
            Mistrz: dla osób które chcą przejść jeszcze poziom wyżej,
            czyli by sztuka szybkiego pisania stała się miejscem
            rywalizacji!
          </GroupTitle>
          <GroupDescription>
            ~<TipBold>120</TipBold>słów/minute
          </GroupDescription>
        </GroupItem>
      </GroupWrapper>
    </Wrapper>
  );
};

export default LevelsSection;
