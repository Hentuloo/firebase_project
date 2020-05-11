import React, { useReducer, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRedirect } from 'hooks/useRedirect';
import { Constants } from 'config/Constants';
import { joinRoom } from 'store/actions/rooms';
import { StoreType } from 'store/store';
import { Db } from 'fb';

interface DashboardStateInterface {
  roomName: string;
  withPassword: boolean;
  roomPasword: string;
}
interface DashboardNewStateInterface {
  roomName?: string;
  withPassword?: boolean;
  roomPasword?: string;
}

const Dashboard: FC = () => {
  const redirect = useRedirect();
  const dispatch = useDispatch();
  const { uid } = useSelector((store: StoreType) => store.user);

  const [inputsValue, setInputValue] = useReducer(
    (
      prev: DashboardStateInterface,
      next: DashboardNewStateInterface,
    ) => ({
      ...prev,
      ...next,
    }),
    {
      roomName: '',
      withPassword: false,
      roomPasword: '',
    },
  );

  const handleChangeInput = (e: any) => {
    const { value, name } = e.target;
    setInputValue({ [name]: value });
  };

  const handleCreateRoom = async (e: any) => {
    e.preventDefault();
    const { roomName } = inputsValue;
    try {
      // Without password
      if (!uid) return;
      const newRoomRef = await Db.init().createNewRoom(uid, roomName);
      const roomId = newRoomRef.id;
      dispatch(joinRoom(roomId));
      redirect(`${Constants.paths.room.path}/${roomId}`);
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <form onSubmit={handleCreateRoom}>
      <h2>Nowy pokój</h2>
      <label>
        Nazwa pokoju:
        <input
          name="roomName"
          type="text"
          value={inputsValue.roomName}
          onChange={handleChangeInput}
        />
      </label>

      <input type="submit" />
    </form>
  );
};

export default Dashboard;
