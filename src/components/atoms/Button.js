import styled from 'styled-components';
import { BarDecorator } from './BarDecorator';

export const ClearButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fs.m};
  color: ${({ theme }) => theme.color.black[0]};
  ${({ theme }) => theme.mediaQuery.md} {
    font-weight: 300;
  }
`;

export const ButtonWithBar = styled(ClearButton)`
  ${BarDecorator}
`;
export const RoundButton = styled(ClearButton)`
  border-radius: 40px;
  border: ${({ theme }) => theme.color.brand[1]} 2px solid;
`;

export const FilledButton = styled(ClearButton)`
  margin: 0px auto;
  padding: 8px 8px 8px 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.white[0]};
  border-radius: 32px;
  background-color: ${({ theme }) => theme.color.brand[3]};
`;
