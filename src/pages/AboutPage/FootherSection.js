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
`;
const FootherLineImage = styled.img`
  position: absolute;
  width: 120%;
  top: 0%;
  transform: translate(-10%, -50%) rotate(43deg);
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
      <LinkText>Regulamin</LinkText>
      <LinkText as="span">Copyrigths@Kamil Chędkowski</LinkText>
      <LinkText>Developer</LinkText>
    </Wrapper>
  );
};

export default FootherSection;
