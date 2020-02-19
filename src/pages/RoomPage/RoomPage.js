import React from 'react';
import { useParams } from 'react-router-dom';

const RoomPage = () => {
  const { roomId } = useParams();

  return <div>Jesteś w pokoju {roomId}</div>;
};

export default RoomPage;
