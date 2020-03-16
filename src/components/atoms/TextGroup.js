import styled from 'styled-components';
import { BarDecorator } from 'components/atoms';

export const TextGroup = styled.div`
  display: grid;
  width: 85%;
  row-gap: 13px;
  margin: 0px auto;
  font-size: ${({ theme }) => theme.fs.s};
  p,
  div {
    padding-left: 14px;
  }
`;
export const TextGroupHeader = styled.h3`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fs.xl};
  ${BarDecorator};
  &::after {
    width: 35%;
    transform: translate(5%, 0%);
  }
`;
export const TipSection = styled.div`
  display: flex;
`;
export const TipBold = styled.span`
  text-transform: uppercase;
  font-weight: 800;
  color: ${({ theme }) => theme.color.brand[1]};
`;
