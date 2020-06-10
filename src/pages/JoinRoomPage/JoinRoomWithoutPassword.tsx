import React, { FC } from 'react';
import styled from 'styled-components';
import { BarDecorator } from 'components/atoms';
import Spiner from 'components/atoms/Spiner';

const Wrapper = styled.div``;
const SmallText = styled.span`
  font-size: ${({ theme }) => theme.fs.xxs};
  margin-right: 8px;
`;
const RoomTitle = styled.span`
  ${BarDecorator}
  font-size: ${({ theme }) => theme.fs.m};
  font-weight:${({ theme }) => theme.fw[1]};
`;
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
      <SmallText>Łącze z: </SmallText>
      <RoomTitle>{roomTitle}</RoomTitle>
      {fetching && <StyledSpiner />}
    </Wrapper>
  );
};
