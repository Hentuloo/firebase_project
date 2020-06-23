import React, { FC } from 'react';
import styled from 'styled-components';
import cornerDefaultSvg from 'assets/svg/road/line1.svg';
import cornerFirstSvg from 'assets/svg/road/corner1.svg';
import CornerSecondSvg from 'assets/svg/road/corner2.svg';

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  ${({ theme }) => theme.mediaQuery.md} {
    min-height: calc(100vh - 130px);
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    min-height: calc(100vh - 155px);
  }
`;

const CornerFirst = styled.img`
  position: fixed;
  right: 0%;
  top: 0%;
  width: 250vw;
  transform: translate(44%, -25%) rotate(-25deg);
  z-index: -5;
  opacity: 0.2;
  ${({ theme }) => theme.mediaQuery.md} {
    width: 100vw;
    max-width: 1200px;
    transform: translate(20%, -15%) rotate(-10deg);
    opacity: 1;
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    max-width: 1500px;
    transform: translate(30%, -15%) rotate(0deg);
  }
`;
const CornerSecond = styled.img`
  position: fixed;
  width: 800px;
  bottom: 0%;
  right: 0%;
  transform: rotate(-12deg) translate(15%, 50%);
  z-index: -5;
  opacity: 0.3;
  ${({ theme }) => theme.mediaQuery.md} {
    opacity: 0.7;
  }
`;
const CornerDefault = styled.img`
  position: fixed;
  width: 800px;
  bottom: 0%;
  right: 0%;
  transform: rotate(-12deg) translate(15%, 50%);
  z-index: -5;
  opacity: 0.3;
  ${({ theme }) => theme.mediaQuery.md} {
    opacity: 0.7;
  }
`;

export enum BackgroundType {
  'CORNER_FIRST',
  'CORNER_SECOND',
}

export interface WithBackgroundTemplateProps {
  type?: BackgroundType;
}

export const WithBackgroundTemplate: FC<WithBackgroundTemplateProps> = ({
  type,
  children,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      {children}
      {type === undefined && <CornerDefault src={cornerDefaultSvg} />}
      {type === BackgroundType.CORNER_FIRST && (
        <CornerFirst src={cornerFirstSvg} />
      )}
      {type === BackgroundType.CORNER_SECOND && (
        <CornerSecond src={CornerSecondSvg} />
      )}
    </Wrapper>
  );
};
