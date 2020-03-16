import styled from 'styled-components';
import { BarDecorator } from './BarDecorator';

export const ClearButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fs.m};
  font-weight: 300;
  color: ${({ theme }) => theme.color.black[0]};
`;

export const ButtonWithBar = styled(ClearButton)`
  ${BarDecorator}
`;
export const RoundButton = styled(ClearButton)`
  border-radius: 40px;
  border: ${({ theme }) => theme.color.brand[1]} 2px solid;
`;
