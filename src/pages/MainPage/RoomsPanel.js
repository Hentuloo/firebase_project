import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { listenRooms } from 'fb/controllers/rooms';

const RoomsPanel = () => {
  const rooms = useSelector(store => store.rooms.avaiableRooms);

  useEffect(() => {
    const unSubAvaiableRooms = listenRooms();
    return () => {
      unSubAvaiableRooms();
    };
  }, []);

  return (
    <div>
      <h2>Dostępne pokoje:</h2>
      <ul>
        {rooms.length &&
          rooms.map(({ id, title }) => <li key={id}>{title}</li>)}
        {rooms.length === 0 && 'nie ma pokoi'}
      </ul>
    </div>
  );
};

export default RoomsPanel;
