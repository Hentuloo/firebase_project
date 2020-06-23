import React, { FC, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { PodiumWithImages } from 'components/organisms';
import { CircledButtonWithImage } from 'components/atoms/Button/CircledButtonWithImage';
import exitDoor from 'assets/svg/icons/exitDoor.svg';
import { useSelector, useDispatch } from 'react-redux';
import { getScoresModalFlag } from 'store/selectors/gameSettings.selector';
import { toggleScoresModal } from 'store/actions/gameSettings.actions';
import { FixedBackgroudProvider } from 'components/molecules';
import gsap from 'gsap';
import { Table } from './Table';

const Wrapper = styled(FixedBackgroudProvider)`
  display: grid;
  max-height: 100%;
  grid-template-rows: 1fr 1fr auto;
  text-align: center;
  align-items: center;
`;
const PodiumImagesWrapper = styled.div`
  margin: 30px auto 10px;
`;
const StyledButton = styled(CircledButtonWithImage)`
  margin: 30px auto;
  align-self: center;
`;

export interface PodiumModalProps {}

export const PodiumModal: FC<PodiumModalProps> = () => {
  const podiumImagesRef = useRef<HTMLDivElement>(null);
  const showModal = useSelector(getScoresModalFlag);
  const dispatch = useDispatch();

  const handleCloseScoresTab = useCallback(() => {
    dispatch(toggleScoresModal());
  }, [dispatch]);

  useEffect(() => {
    if (showModal) {
      const el = podiumImagesRef.current;
      if (!el) return;

      gsap.set(el, { opacity: 0.2, scale: 0.05 });
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.6,
      });
    }
  }, [showModal]);

  if (!showModal) return null;
  return (
    <Wrapper>
      <PodiumImagesWrapper ref={podiumImagesRef}>
        <PodiumWithImages />
      </PodiumImagesWrapper>
      <Table />
      <StyledButton
        title="Zamknij"
        onClick={handleCloseScoresTab}
        src={exitDoor}
        alt="Powrót"
      />
    </Wrapper>
  );
};
