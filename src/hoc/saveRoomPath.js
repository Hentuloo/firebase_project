import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { joinRoom } from 'store/actions/rooms';

export const saveRoomPath = Component => {
  return (...props) => {
    const dispatch = useDispatch();
    const { roomId } = useParams();
    useEffect(() => {
      dispatch(joinRoom(roomId));
    }, []);

    return <Component {...props} />;
  };
};
