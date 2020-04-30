import styled, { css } from 'styled-components';

interface LoadingBarProps {
  progress?: number;
  green?: boolean;
  duration?: number;
  easing?: string;
}

export const LoadingBar = styled.div<LoadingBarProps>`
  position: relative;
  height: 5px;
  width: 100%;
  background: ${({ theme }) => theme.color.gradients[0]};
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    background-color: ${({ theme }) => theme.color.gray[0]};
    transition: transform
      ${({ duration }) => (duration ? `${duration}s` : '0.5s')}
      ${({ easing }) => easing || 'ease'};
  }

  ${({ green }) =>
    green &&
    css`
      background: ${({ theme }) => theme.color.brand[0]};
    `}

  ${({ progress }) =>
    progress &&
    css`
      &::after {
        transform: translateX(${progress}%);
      }
    `}
`;
