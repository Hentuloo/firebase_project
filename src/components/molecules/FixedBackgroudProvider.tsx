import React, { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0%;
  top: 0%;
  background-color: ${({ theme }) => theme.color.white[0]};
  z-index: 5;
`;

export interface FixedBackgroudProviderProps {}

export const FixedBackgroudProvider: FC<FixedBackgroudProviderProps> = ({
  children,
  ...props
}) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};
