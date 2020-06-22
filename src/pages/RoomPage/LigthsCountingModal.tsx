import React, { FC, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { ClearModal } from 'components/molecules';
import gsap from 'gsap';
import { useSelector } from 'react-redux';
import { getGameSettings } from 'store/selectors/gameSettings.selector';

const Wrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
`;
export interface LigthsCountingModalProps {}

export const LigthsCountingModal: FC<LigthsCountingModalProps> = ({
  ...props
}) => {
  const { timesOfLightChanges } = useSelector(getGameSettings);
  const circlesWrapperRef = useRef<SVGGElement>(null);
  const [ligthsActive, setLightsActive] = useState(false);
  const [ligthStepNumber, setLigthStepNumber] = useState(0);

  useEffect(() => {
    let timeoutsIds: number[] = [];
    if (timesOfLightChanges !== null) {
      setLightsActive(true);

      timeoutsIds = timesOfLightChanges.map((delay, index) =>
        setTimeout(() => {
          setLigthStepNumber(index + 1);
        }, delay),
      );
    }
    return () => {
      timeoutsIds.forEach(id => clearTimeout(id));
    };
  }, [timesOfLightChanges]);

  useEffect(() => {
    if (ligthStepNumber === 0) return;
    const circlesWrapper = circlesWrapperRef.current;
    if (!circlesWrapper) return;
    const circles = [...circlesWrapper.children];

    // change ligths
    if (ligthStepNumber > 0 && ligthStepNumber <= 3) {
      gsap.to(circles[ligthStepNumber - 1], {
        duration: 0.2,
        fill: '#6A9881',
      });
    } else if (ligthStepNumber === 4) {
      setLightsActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ligthStepNumber]);

  if (!ligthsActive) return null;

  return (
    <ClearModal>
      <Wrapper {...props}>
        <svg
          width="74"
          height="179"
          viewBox="0 0 74 179"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Group 96">
            <rect
              id="Rectangle 109"
              width="74"
              height="178.393"
              rx="37"
              fill="#353535"
            />
            <g ref={circlesWrapperRef} id="Group 97">
              <circle
                id="circle"
                cx="36.6697"
                cy="38.6519"
                r="18.8304"
                fill="#C4C4C4"
              />
              <circle
                id="circle_2"
                cx="36.6697"
                cy="89.5269"
                r="18.8304"
                fill="#C5C5C5"
              />
              <circle
                id="circle_3"
                cx="36.6697"
                cy="140.402"
                r="18.8304"
                fill="#C5C5C5"
              />
            </g>
          </g>
        </svg>
      </Wrapper>
    </ClearModal>
  );
};
