import styled, { css } from 'styled-components';

export const LoadingBar = styled.div`
  position: relative;
  height: 4px;
  width: 100%;
  background: ${({ theme }) => theme.color.gradients[0]};
  border-radius: 20px;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    background-color: ${({ theme }) => theme.color.gray[0]};
    transition: transform 0.5s ease;
  }
  ${({ progress }) =>
    progress &&
    css`
      &::after {
        transform: translateX(${progress}%);
      }
    `}
`;
