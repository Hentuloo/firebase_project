import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { RoundButton } from './Button';

const Wrapper = styled(RoundButton)`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 45px;
  padding: 6px 6px 8px;
  font-size: ${({ theme }) => theme.fs.xs};
`;
export const ButtonText = styled.span`
  width: calc(100% - 55px);
  margin: 0px auto;
`;

export const NumberIcon = styled.span`
  position: absolute;
  display: grid;
  width: 25px;
  height: 25px;
  top: 50%;
  right: 10px;
  justify-content: center;
  align-content: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.black[0]};
  color: ${({ theme }) => theme.color.white[0]};
  font-size: ${({ theme }) => theme.fs.xxs};
  transform: translate(0%, -50%);
  padding-bottom: 2px;
`;
const IconStyles = css`
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  font-size: ${({ theme }) => theme.fs.s};
`;
export const ArrowIcon = styled.span`
  ${IconStyles}
  left: 15px;
  font-size: ${({ theme }) => theme.fs.xxxs};
`;
export const LockIcon = styled.span`
  ${IconStyles}
  padding-top: 2px;
  right: 14px;
`;

export const RoomButton = ({
  number,
  children,
  withKey,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <ButtonText>{children}</ButtonText>
      <ArrowIcon className="fa fa-arrow-right" aria-hidden="true" />
      {number && <NumberIcon>{number}</NumberIcon>}
      {withKey && (
        <LockIcon className="fa fa-lock" aria-hidden="true" />
      )}
    </Wrapper>
  );
};
RoomButton.propTypes = {
  children: PropTypes.node.isRequired,
  number: PropTypes.number,
  withKey: PropTypes.bool,
};
RoomButton.defaultProps = {
  number: null,
  withKey: false,
};
