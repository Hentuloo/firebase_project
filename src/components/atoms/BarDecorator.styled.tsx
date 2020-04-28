import { css } from 'styled-components';

export const BarDecorator = css`
  position: relative;
  &::after {
    position: absolute;
    content: '';
    width: 60%;
    max-width: 120px;
    height: 45%;
    bottom: -5%;
    left: 50%;
    background-color: ${({ theme }) => theme.color.brand[0]};
    z-index: -1;
    transform: translate(-50%, 0%);
  }
`;

export const BarDecoratorForLink = css`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fs.m};
  color: ${({ theme }) => theme.color.black[0]};
  ${BarDecorator};
`;
