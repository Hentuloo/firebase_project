import React, { FC, useRef, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import gsap from 'gsap';

export const Bar = styled.div`
  position: relative;
  height: 5px;
  width: 100%;
  background: ${({ theme }) => theme.color.gradients[0]};
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);

  ${({ green }: { green?: boolean }) =>
    green &&
    css`
      background: ${({ theme }) => theme.color.gray[0]};
    `}
`;

export const InnerBar = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;

  ${({ green }: { green?: boolean }) =>
    green &&
    css`
      background: ${({ theme }) => theme.color.contrastBrand[1]};
    `}
`;

interface LoadingBarProps extends React.ComponentProps<any> {
  progress?: number;
  green?: boolean;
  duration?: number;
  easing?: string;
}

export const LoadingBar: FC<LoadingBarProps> = ({
  progress = 0,
  green,
  duration = 0.5,
  easing = 'ease',
  ...props
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const updateProgress = useCallback(() => {
    gsap.to(wrapperRef.current, {
      duration,
      ease: easing,
      x: `-${100 - (progress || 0)}%`,
    });
  }, [duration, easing, progress]);

  useEffect(() => {
    updateProgress();
  }, [updateProgress]);

  return (
    <Bar green={green} {...props}>
      <InnerBar ref={wrapperRef} green={green} />
    </Bar>
  );
};
