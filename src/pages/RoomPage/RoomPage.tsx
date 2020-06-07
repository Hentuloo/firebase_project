import React, { useEffect, FC } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Db } from 'fb';
import { useSelector } from 'react-redux';
import { getGameSettings } from 'store/selectors/gameSettings.selector';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 400px auto;
`;
// sprawdź czy usuwa document pokoju
const RoomPage: FC = () => {
  const { roomId } = useParams();
  const settings = useSelector(getGameSettings);

  useEffect(() => {
    // Try to join to this room
    const { listenGameSettings } = Db.init();
    let unSubGameSettings: any = () => null;
    const subscribeGame = async () => {
      try {
        unSubGameSettings = await listenGameSettings(roomId);
      } catch (e) {
        console.log({ ...e });
      }
    };

    subscribeGame();

    return () => {
      unSubGameSettings();
    };
  }, [roomId]);

  return (
    <Wrapper>
      {JSON.stringify(settings)}
      {/* <RoomDetailsBar /> */}
    </Wrapper>
  );
};

export default RoomPage;
