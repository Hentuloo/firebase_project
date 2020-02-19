import { combineReducers } from 'redux';
import userReducer from './userReducer';
import roomsReducer from './roomsReducer';

export default combineReducers({
  user: userReducer,
  rooms: roomsReducer,
});
