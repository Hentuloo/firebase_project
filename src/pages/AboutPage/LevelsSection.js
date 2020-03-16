import React from 'react';
import styled from 'styled-components';
import { TipBold, TextGroupHeader } from 'components/atoms';

import {
  GroupWrapper,
  GroupItem,
  GroupImage,
  GroupTitle,
  GroupDescription,
} from 'components/molecules';

const Wrapper = styled.section`
  margin-top: 70px;
`;
const StyledHeader = styled(TextGroupHeader)`
  font-size: ${({ theme }) => theme.fs.large};
  text-align: center;
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
          <GroupImage src="https://unsplash.it/200/200" />
          <GroupTitle>Adept</GroupTitle>
          <GroupDescription>
            ~<TipBold>40</TipBold>słów/minute
          </GroupDescription>
        </GroupItem>
        <GroupItem>
          <GroupImage src="https://unsplash.it/200/200" />
          <GroupTitle>Adept</GroupTitle>
          <GroupDescription>
            ~<TipBold>40</TipBold>słów/minute
          </GroupDescription>
        </GroupItem>
        <GroupItem>
          <GroupImage src="https://unsplash.it/200/200" />
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
