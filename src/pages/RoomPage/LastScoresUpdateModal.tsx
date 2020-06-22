import React, { FC } from 'react';
import styled from 'styled-components';
import { FixedBackgroudProvider } from 'components/molecules';
import { TitleWithSmallPrefix } from 'components/molecules/TitleWithSmallPrefix';
import Spiner from 'components/atoms/Spiner';
import { useSelector } from 'react-redux';
import { getLastScoresUpdateFlag } from 'store/selectors/gameSettings.selector';

const Wrapper = styled(FixedBackgroudProvider)`
  display: grid;
  justify-items: center;
  align-items: center;
`;
const InnerWrapper = styled.div`
  display: grid;
  grid-row-gap: 20px;
`;

export interface LastScoresUpdateModalProps {}

export const LastScoresUpdateModal: FC<LastScoresUpdateModalProps> = ({
  ...props
}) => {
  const flag = useSelector(getLastScoresUpdateFlag);

  if (!flag) return null;
  return (
    <Wrapper {...props}>
      <InnerWrapper>
        <TitleWithSmallPrefix prefix="zliczam:" title="WYNIKI" />
        <Spiner />
      </InnerWrapper>
    </Wrapper>
  );
};
