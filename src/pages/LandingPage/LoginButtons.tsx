import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { Constants } from 'config/Constants';
import { Link } from 'react-router-dom';
import { BarDecorator, ClearButton } from 'components/atoms';

const Wrapper = styled.div`
  display: grid;
  width: 200px;
  grid-auto-flow: row;
  margin: 10px 20px;
  grid-row-gap: 10px;
  text-align: center;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-row-gap: 20px;
    margin: 150px 100px;
  }
`;
const NewAccountButton = styled(ClearButton)`
  font-size: ${({ theme }) => theme.fs.s};
  text-decoration: none;

  ${({ theme }) => theme.mediaQuery.md} {
    font-size: ${({ theme }) => theme.fs.xl};
  }
  ${({ smaller }: { smaller?: boolean }) =>
    smaller &&
    css`
      font-size: ${({ theme }) => theme.fs.xs};
      ${({ theme }) => theme.mediaQuery.md} {
        font-size: ${({ theme }) => theme.fs.m};
      }
    `}
`;
const NewAccountButtonContent = styled.span`
  ${BarDecorator}
`;

export interface LoginButtonsProps {}

export const LoginButtons: FC<LoginButtonsProps> = ({ ...props }) => {
  return (
    <Wrapper {...props}>
      <NewAccountButton as={Link} to={Constants.paths.login.path}>
        <NewAccountButtonContent>Nowe konto</NewAccountButtonContent>
      </NewAccountButton>
      <NewAccountButton
        smaller
        as={Link}
        to={Constants.paths.createAccount.path}
      >
        <NewAccountButtonContent>
          Mam już konto
        </NewAccountButtonContent>
      </NewAccountButton>
    </Wrapper>
  );
};
