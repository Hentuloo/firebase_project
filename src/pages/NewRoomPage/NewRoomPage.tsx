import React, { FC } from 'react';
import styled from 'styled-components';
import WithMenuTemplate from 'templates/WithMenuTemplate';
import { RoomSetings } from 'components/organisms/RoomSettings';

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  align-items: center;
`;

export const NewRoomPage: FC = () => {
  return (
    <WithMenuTemplate>
      <Wrapper>
        <RoomSetings onSubmit={x => console.log(x)} />
      </Wrapper>
    </WithMenuTemplate>
  );
};
