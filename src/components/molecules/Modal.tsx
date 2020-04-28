import React, { FC } from 'react';
import styled, { css } from 'styled-components';

import { useDetectOutElementClick } from 'hooks/useDetectOutElementClick';

const withShadow = css`
  position: relative;
  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 45px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.color.white[0]};
    z-index: -1;
  }
`;

export const stickyModal = css`
  width: 94%;
  min-height: 10px;
  margin: 0px auto;
  border-radius: 40px;
  ${withShadow}
`;

interface FixedModalProps {
  active?: boolean;
}

export const FixedModal = styled.div<FixedModalProps>`
  width: 94%;
  max-width: 400px;
  min-height: 80px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -100vh);
  border-radius: 40px;
  transition: transform 0.4s ease-in;
  z-index: 6;

  ${withShadow}
  position: fixed;

  ${({ theme }) => theme.mediaQuery.lg} {
    max-width: 600px;
  }

  ${({ active }) =>
    active &&
    css`
      transform: translate(-50%, -50%);
    `}
`;

interface FixedModalWrapperProps {
  active?: boolean;
}

export const FixedModalWrapper = styled.div<FixedModalWrapperProps>`
  &::before {
    position: fixed;
    content: '';
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${({ theme }) => theme.color.gray[0]};
    opacity: 0.4;
    z-index: 5;
    display: none;
    ${({ active }) =>
      active &&
      css`
        display: block;
      `}
  }
`;

interface ModalProps {
  children: React.ReactNode;
  toggleActive: (flag: boolean) => void;
  active?: boolean;
}

export const Modal: FC<ModalProps> = ({
  children,
  active = false,
  toggleActive,
  ...props
}) => {
  const ref = useDetectOutElementClick<HTMLDivElement>(active, () =>
    toggleActive(false),
  );
  return (
    <FixedModalWrapper active={active} {...props}>
      <FixedModal ref={ref} active={active}>
        {children}
      </FixedModal>
    </FixedModalWrapper>
  );
};
