import React, { FC } from 'react';
import styled from 'styled-components';
import Spiner from 'components/atoms/Spiner';
import { TitleWithSmallPrefix } from 'components/molecules/TitleWithSmallPrefix';

const Wrapper = styled.div``;

const StyledSpiner = styled(Spiner)`
  margin: 10px auto 0px;
`;

export interface JoinRoomWithoutPasswordProps {
  roomTitle: string;
  fetching: boolean;
}

export const JoinRoomWithoutPassword: FC<JoinRoomWithoutPasswordProps> = ({
  roomTitle,
  fetching,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <TitleWithSmallPrefix prefix="Łącze z:" title={roomTitle} />
      {fetching && <StyledSpiner />}
    </Wrapper>
  );
};
