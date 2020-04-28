import React, { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import { Input } from './Input';

export const InputWithIconWrapper = styled.div`
  position: relative;
`;
const StyledInput = styled(Input)`
  width: 100%;
  padding-right: 45px;
`;

export const Icon = styled.span`
  position: absolute;
  top: 50%;
  right: 20px;
  font-size: ${({ theme }) => theme.fs.s};
  transform: translate(0%, -50%);
`;

interface InputWithFAProps
  extends InputHTMLAttributes<HTMLInputElement> {
  iconClass: string;
  className?: string;
}

export const InputWithFA: FC<InputWithFAProps> = ({
  iconClass,
  type = 'text',
  className = '',
  ...props
}) => {
  if (!iconClass) {
    Error('iconClass is required for inputWithFA');
    return null;
  }
  return (
    <InputWithIconWrapper>
      <StyledInput
        className={className}
        type={type}
        name="displayName"
        placeholder="Szukaj"
        {...props}
      />
      <Icon className={`fa ${iconClass}`} aria-hidden="true" />
    </InputWithIconWrapper>
  );
};
