import React from 'react';
import PropTypes from 'prop-types';
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

export const InputWithFA = ({ iconClass, className, ...props }) => {
  if (!iconClass)
    return Error('iconClass is required for inputWithFA');
  return (
    <InputWithIconWrapper>
      <StyledInput
        className={className}
        type="text"
        name="displayName"
        placeholder="Szukaj"
        {...props}
      />
      <Icon className={`fa ${iconClass}`} aria-hidden="true" />
    </InputWithIconWrapper>
  );
};
InputWithFA.propTypes = {
  className: PropTypes.string,
  iconClass: PropTypes.string.isRequired,
};
InputWithFA.defaultProps = {
  className: '',
};
