import React from 'react';
import styled from 'styled-components';

import lineSVG from 'assets/svg/road/line1.svg';
import { BarDecorator } from 'components/atoms';

const Wrapper = styled.footer`
  position: relative;
  display: grid;
  grid-auto-flow: column;
  margin-top: 80px;
  margin-bottom: 30px;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-template-columns: 1fr 40% 1fr;
    margin-top: 300px;
  }
`;
const LinksWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-column: 2 / span 1;
  }
`;
const FootherLineImage = styled.img`
  position: absolute;
  width: 120%;
  top: 0%;
  transform: translate(-10%, -50%) rotate(43deg);
  z-index: -5;
  pointer-events: none;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-column: 1/-1;
    width: 105%;
    transform: translate(0%, -44%) rotate(43deg);
    filter: grayscale(1);
  }
`;
const LinkText = styled.a`
  ${BarDecorator};
  font-size: ${({ theme }) => theme.fs.xxs};
  font-weight: 600;
  text-align: center;

  &::after {
    width: 20%;
    right: 0%;
    transform: translate(50%, 0%);
  }
`;

const FootherSection = () => {
  return (
    <Wrapper>
      <FootherLineImage src={lineSVG} />
      <LinksWrapper>
        <LinkText>Regulamin</LinkText>
        <LinkText as="span">Copyrigths@Kamil Chędkowski</LinkText>
        <LinkText>Developer</LinkText>
      </LinksWrapper>
    </Wrapper>
  );
};

export default FootherSection;
