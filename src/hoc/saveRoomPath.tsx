import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { joinRoom } from 'store/actions/rooms.actions';

export const saveRoomPath = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  return (...props: any) => {
    const dispatch = useDispatch();
    const { roomId } = useParams();
    useEffect(() => {
      dispatch(joinRoom(roomId));
    }, [dispatch, roomId]);

    return <Component {...props} />;
  };
};
