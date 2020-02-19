import React, { useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createNewRoom } from 'fb/controllers/rooms';
import { useHistory } from 'react-router-dom';
import { Constants } from 'config/Constants';
import { joinRoom } from 'store/actions/rooms';

const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { uid } = useSelector(store => store.user);

  const [inputsValue, setInputValue] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {
      roomName: '',
      withPassword: false,
      roomPasword: '',
    },
  );

  const handleChangeInput = e => {
    const { value, name } = e.target;
    setInputValue({ [name]: value });
  };

  const handleCreateRoom = async e => {
    e.preventDefault();
    const { roomName } = inputsValue;
    try {
      // Without password
      const newRoomRef = await createNewRoom(uid, roomName);
      const roomId = newRoomRef.id;
      dispatch(joinRoom(roomId));
      history.push(`${Constants.paths.room.path}/${roomId}`);
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
