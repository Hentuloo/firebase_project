import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { BarDecoratorForLink } from '../BarDecorator.styled';

export interface ButtonProps extends React.ComponentProps<any> {
  /**
   * Link url
   */
  to?: string;
  disabled?: boolean;
}
const offStylesProps = css<{ off?: boolean }>`
  ${({ off }) =>
    off &&
    css`
      cursor: initial !important;
      pointer-events: none;
      filter: ${({ theme }) => theme.color.disabledButtonFilter[0]};
    `}
`;
const LinkWithOffProp = styled(Link)`
  ${offStylesProps}
`;

const ButtonWithOffProp = styled.button`
  ${offStylesProps}
`;

const Button: FC<ButtonProps> = ({
  to,
  children,
  disabled = undefined,
  ...props
}) => {
  if (to) {
    return (
      <LinkWithOffProp to={to} off={disabled} {...props}>
        {children}
      </LinkWithOffProp>
    );
  }

  return (
    <ButtonWithOffProp type="button" off={disabled} {...props}>
      {children}
    </ButtonWithOffProp>
  );
};

export const ClearButton = styled(Button)`
  border: none;
  background-color: transparent;
  font-family: 'Open Sans', sans-serif;
  font-weight: ${({ theme }) => theme.fw[1]};
  font-size: ${({ theme }) => theme.fs.m};
  color: ${({ theme }) => theme.color.black[0]};
  cursor: pointer;

  ${({ theme }) => theme.mediaQuery.md} {
    font-weight: 300;
  }
`;

export const ButtonWithBar = styled(ClearButton)`
  ${BarDecoratorForLink}
`;

export const RoundButton = styled(ClearButton)`
  border-radius: 40px;
  border: ${({ theme }) => theme.color.brand[1]} 2px solid;
`;
export const CircleButton = styled(ClearButton)`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.color.shadow[0]};
  color: ${({ theme }) => theme.color.brand[0]};
`;

export const FilledButton = styled(ClearButton)`
  margin: 0px auto;
  padding: 8px 8px 8px 14px;
  border-radius: 32px;
  font-weight: ${({ theme }) => theme.fw[0]};
  color: ${({ theme }) => theme.color.contrastWhite[0]};
  background-color: ${({ theme }) => theme.color.buttonColor[0]};
  box-shadow: ${({ theme }) => theme.color.buttonShadow[0]};
  &:hover {
    box-shadow: ${({ theme }) => theme.color.buttonShadow[1]};
  }
`;
