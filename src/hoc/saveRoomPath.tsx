import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSavedRoomUrl } from 'store/actions/rooms.actions';
import { getUser } from 'store/selectors/user.selector';

export const saveRoomPath = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  return (...props: any) => {
    const dispatch = useDispatch();
    const { uid } = useSelector(getUser);
    const { roomId, title, withPassword } = useParams();
    useEffect(() => {
      if (uid) return;
      dispatch(
        setSavedRoomUrl(
          `/${roomId}/${title}${withPassword ? '/pass' : ''}`,
        ),
      );
    }, [dispatch, roomId, title, uid, withPassword]);

    return <Component {...props} />;
  };
};
