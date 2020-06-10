import React from 'react';
import styled, { keyframes } from 'styled-components';

const bubbleAnim = keyframes` 
to{
    transform: scale(1.3);
  }
`;

const Circle = styled.div`
  position: absolute;
  width: 15px;
  min-height: 15px;
  border-radius: 50%;

  background-color: ${({ theme }) => theme.color.brand[3]};
  animation: ${bubbleAnim} 0.6s ease-in-out infinite alternate both;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 80px;
  min-height: 20px;
  margin: 0px auto;

  ${Circle}:nth-of-type(1) {
    left: 0px;
    animation-delay: 0s;
  }
  ${Circle}:nth-of-type(2) {
    left: calc(50% - 7.5px);
    animation-delay: 0.2s;
  }
  ${Circle}:nth-of-type(3) {
    right: 0px;
    animation-delay: 0.4s;
  }
`;

export interface SpinerProps {}

const Spiner = ({ ...props }) => {
  return (
    <Wrapper {...props}>
      <Circle />
      <Circle />
      <Circle />
    </Wrapper>
  );
};

export default Spiner;
