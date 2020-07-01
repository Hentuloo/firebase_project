import React, { FC, useMemo } from 'react';
import styled, { css } from 'styled-components';

import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import dayjs from 'dayjs';
import { RoundButton } from './Button.styled';

interface WrapperProps {
  /**
   * Link url
   */
  to?: string;
}
const Wrapper = styled(RoundButton)<WrapperProps>`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 45px;
  padding: 6px 6px 8px;
  font-size: ${({ theme }) => theme.fs.xs};
  text-decoration: none;
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

interface RoomButtonProps {
  title: string;
  created?: number;
  number?: number;
  withKey?: boolean;
  to?: string;
}

export const RoomButton: FC<RoomButtonProps> = ({
  title,
  number = null,
  withKey = false,
  to,
  created,
  ...props
}) => {
  const createdTime = useMemo(
    () => `Utworzono ${dayjs().from(dayjs(created), true)} temu`,
    [created],
  );
  return (
    <Tippy
      content={createdTime}
      delay={300}
      disabled={created === undefined}
    >
      <Wrapper
        as={to ? Link : 'button'}
        to={to}
        {...props}
        title={title}
      >
        <ButtonText>
          {title.length < 18 ? title : `${title.slice(0, 16)}...`}
        </ButtonText>
        <ArrowIcon className="fa fa-arrow-right" aria-hidden="true" />
        {number && <NumberIcon>{number}</NumberIcon>}
        {withKey && (
          <LockIcon className="fa fa-lock" aria-hidden="true" />
        )}
      </Wrapper>
    </Tippy>
  );
};
