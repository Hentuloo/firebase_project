import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { PodiumWithImages } from 'components/organisms';
import { CircledButtonWithImage } from 'components/atoms/Button/CircledButtonWithImage';
import exitDoor from 'assets/svg/icons/exitDoor.svg';
import { useSelector, useDispatch } from 'react-redux';
import { getScoresModalFlag } from 'store/selectors/gameSettings.selector';
import { toggleScoresModal } from 'store/actions/gameSettings.actions';
import { FixedBackgroudProvider } from 'components/molecules';
import { Table } from './Table';

const Wrapper = styled(FixedBackgroudProvider)`
  display: grid;
  max-height: 100%;
  grid-template-rows: 1fr 1fr auto;
  text-align: center;
  align-items: center;
`;
const StyledPodiumWithImages = styled(PodiumWithImages)`
  margin: 30px auto 10px;
`;
const StyledButton = styled(CircledButtonWithImage)`
  margin: 30px auto;
  align-self: center;
`;

export interface PodiumModalProps {}

export const PodiumModal: FC<PodiumModalProps> = () => {
  const showModal = useSelector(getScoresModalFlag);
  const dispatch = useDispatch();

  const handleCloseScoresTab = useCallback(() => {
    dispatch(toggleScoresModal());
  }, [dispatch]);

  if (!showModal) return null;
  return (
    <Wrapper>
      <StyledPodiumWithImages />
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
