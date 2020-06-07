import React, { FC } from 'react';
import styled from 'styled-components';
import { BarDecorator } from 'components/atoms';

const Wrapper = styled.div``;
const RoomTitle = styled.span`
  ${BarDecorator}
  font-size: ${({ theme }) => theme.fs.m};
  font-weight:${({ theme }) => theme.fw[1]};
`;
const SmallText = styled.span`
  font-size: ${({ theme }) => theme.fs.xxs};
  margin-right: 8px;
`;

export interface JoinRoomWithoutPasswordProps {
  roomTitle: string;
}

export const JoinRoomWithoutPassword: FC<JoinRoomWithoutPasswordProps> = ({
  roomTitle,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <SmallText>Łącze z: </SmallText>
      <RoomTitle>{roomTitle}</RoomTitle>
    </Wrapper>
  );
};
