import styled, { css } from 'styled-components';

export const CardBackgroud = css`
  position: relative;
  &::before {
    position: absolute;
    content: '';
    width: 70%;
    height: 100%;
    top: 50%;
    left: 50%;
    padding: 30px 0px;
    transform: translate(-50%, -50%);
    border-radius: 45px;
    box-shadow: ${({ theme }) => theme.color.shadow[0]};
    background-color: ${({ theme }) => theme.color.white[0]};
    z-index: -1;
  }
`;
export const Card = styled.div`
  ${CardBackgroud}
`;
