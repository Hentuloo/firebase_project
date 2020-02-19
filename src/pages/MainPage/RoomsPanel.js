import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { listenRooms } from 'fb/controllers/rooms';

const RoomsPanel = () => {
  const rooms = useSelector(store => store.rooms.avaiableRooms);

  useEffect(() => {
    const unSubscribe = listenRooms();
    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <div>
      <h2>Dostępne pokoje:</h2>
      <ul>
        {rooms.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoomsPanel;
