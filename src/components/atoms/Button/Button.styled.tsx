import React, { FC } from 'react';
import styled from 'styled-components';
import { BarDecorator } from 'components/atoms';
import { Link } from 'react-router-dom';

export interface ButtonProps extends React.ComponentProps<any> {
  to?: string;
}

const Button: FC<ButtonProps> = ({ to, children, ...props }) => {
  if (to) {
    return (
      <Link to={to} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
};

export const ClearButton = styled(Button)`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-family: 'Open Sans', sans-serif;
  font-weight: ${({ theme }) => theme.fw[1]};
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
export const CircleButton = styled(ClearButton)`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.color.brand[0]};
`;

export const FilledButton = styled(ClearButton)`
  margin: 0px auto;
  padding: 8px 8px 8px 14px;
  border-radius: 32px;
  font-weight: ${({ theme }) => theme.fw[0]};
  color: ${({ theme }) => theme.color.white[0]};
  background-color: ${({ theme }) => theme.color.brand[3]};
`;
