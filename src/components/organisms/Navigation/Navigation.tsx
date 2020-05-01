import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { CardBackgroud } from 'components/molecules';

import { gsap } from 'gsap';
import { Draggable } from 'gsap/all';
import useIsMobile from 'hooks/useIsMobile';
import List from './ListWrapper';

const Wrapper = styled.nav`
  width: 60px;
  height: 100%;
  left: 0%;
  top: 0%;
  ${CardBackgroud}
  position: fixed;
  transform: translate(-70%, 0%);

  ${({ theme }) => theme.mediaQuery.md} {
    position: relative;
    width: auto;
    height: auto;
    transform: translate(0%, 0%);
  }

  &::before {
    height: 92%;
    width: 140%;
    left: 25%;
    ${({ theme }) => theme.mediaQuery.md} {
      left: 50%;
      width: 95%;
      height: 190%;
      padding: 0px;
    }
  }
`;
interface NavigationProps {
  className?: string;
}
export const Navigation: FC<NavigationProps> = ({
  className = '',
}) => {
  const isMobile = useIsMobile();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = navRef.current;
    if (!el || !isMobile) return;

    const elementWidthOnePercentPoint = el.clientWidth / 100;
    const sub = Draggable.create(el, {
      type: 'x',
      lockAxis: true,
      trigger: 'body',

      minimumMovement: 20,
      bounds: {
        minX: -elementWidthOnePercentPoint * 70,
        minY: 0,
        maxX: elementWidthOnePercentPoint * 5,
        maxY: 0,
      },
      onDragEnd() {
        if (this.getDirection('start') === 'left') {
          // show nav
          gsap.to(el, {
            duration: 0.2,
            x: -elementWidthOnePercentPoint * 70,
          });
        } else {
          // hide nav
          gsap.to(el, {
            duration: 0.2,
            x: elementWidthOnePercentPoint * 5,
          });
        }
      },
    });

    return () => {
      sub[0].kill();
    };
  }, [isMobile]);

  return (
    <Wrapper ref={navRef} className={className}>
      <List />
    </Wrapper>
  );
};
