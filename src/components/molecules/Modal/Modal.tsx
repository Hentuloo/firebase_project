import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { useDetectOutElementClick } from 'hooks/useDetectOutElementClick';
import Portal from './Portal';

const withShadow = css`
  position: relative;
  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 45px;
    box-shadow: ${({ theme }) => theme.color.shadow[0]};
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

export const FixedModal = styled.div`
  width: 94%;
  max-width: 400px;
  min-height: 80px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 40px;
  transition: transform 0.4s ease-in;
  z-index: 6;

  ${withShadow}
  position: fixed;

  ${({ theme }) => theme.mediaQuery.lg} {
    max-width: 600px;
  }
`;

export const FixedModalWrapper = styled.div`
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
  }
`;

interface ModalProps {
  children: React.ReactNode;
  toggleActive?: () => void;
}

export const ClearModal: FC<ModalProps> = ({
  children,
  toggleActive = () => null,
  ...props
}) => {
  const ref = useDetectOutElementClick<HTMLDivElement>(toggleActive);
  return (
    <Portal>
      <FixedModalWrapper {...props} ref={ref}>
        {children}
      </FixedModalWrapper>
    </Portal>
  );
};

export const Modal: FC<ModalProps> = ({
  children,
  toggleActive = () => null,
  ...props
}) => {
  const ref = useDetectOutElementClick<HTMLDivElement>(toggleActive);
  return (
    <Portal>
      <FixedModalWrapper {...props}>
        <FixedModal ref={ref}>{children}</FixedModal>
      </FixedModalWrapper>
    </Portal>
  );
};
