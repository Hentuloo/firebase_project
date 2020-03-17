import React from 'react';
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
`;
const StyledHeader = styled(TextGroupHeader)`
  font-size: ${({ theme }) => theme.fs.large};
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

const LevelsSection = () => {
  return (
    <Wrapper>
      <StyledHeader>Dostępne poziomy:</StyledHeader>
      <GroupWrapper>
        <GroupItem>
          <GroupImageWrapper>
            <GroupImage src={level1} />
          </GroupImageWrapper>
          <GroupTitle>Adept</GroupTitle>
          <GroupDescription>
            ~<TipBold>40</TipBold>słów/minute
          </GroupDescription>
        </GroupItem>
        <GroupItem>
          <GroupImageWrapper>
            <GroupImage src={level2} />
          </GroupImageWrapper>
          <GroupTitle>Adept</GroupTitle>
          <GroupDescription>
            ~<TipBold>40</TipBold>słów/minute
          </GroupDescription>
        </GroupItem>
        <GroupItem>
          <GroupImageWrapper>
            <GroupImage src={level3} />
          </GroupImageWrapper>
          <GroupTitle>Adept</GroupTitle>
          <GroupDescription>
            ~<TipBold>40</TipBold>słów/minute
          </GroupDescription>
        </GroupItem>
      </GroupWrapper>
    </Wrapper>
  );
};

export default LevelsSection;
