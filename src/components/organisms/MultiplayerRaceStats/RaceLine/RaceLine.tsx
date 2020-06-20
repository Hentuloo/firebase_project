import React, { FC, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { RoadImages, RoadImagesProps } from './RoadImages';
import { Scores, ScoresProps } from './Scores';

const PlayerName = styled.div`
  font-weight: ${({ theme }) => theme.fw[1]};
  font-size: ${({ theme }) => theme.fs.xxs};
  color: ${({ theme }) => theme.color.gray[1]};
  opacity: 0.4;
  ${({ theme }) => theme.mediaQuery.md} {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(calc(-100% - 10px), -50%);
  }
`;
const Wrapper = styled.div`
  position: relative;
  min-height: 60px;
  display: grid;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
  ${({ theme }) => theme.mediaQuery.md} {
    min-height: 100px;
    display: block;
  }
  &:hover {
    ${PlayerName} {
      opacity: 1;
    }
  }
`;
export interface RaceLineProps
  extends Omit<RoadImagesProps, 'wrapperWidth'>,
    ScoresProps {
  displayName: string;
}

export const RaceLine: FC<RaceLineProps> = ({
  displayName,
  accuracy,
  points,
  progress,
  wpmSpeed,
  difference,
  startTimestamp,
  endTimestamp,
  ...props
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const wrapperWidth = useMemo(() => {
    const el = wrapperRef.current;
    if (!el) return null;
    return el.clientWidth;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrapperRef.current]);

  return (
    <Wrapper ref={wrapperRef} {...props}>
      <PlayerName>{displayName}</PlayerName>
      <RoadImages
        progress={progress}
        wrapperWidth={wrapperWidth}
        startTimestamp={startTimestamp}
        endTimestamp={endTimestamp}
      />
      <Scores
        accuracy={accuracy}
        points={points}
        wpmSpeed={wpmSpeed}
        difference={difference}
      />
    </Wrapper>
  );
};
