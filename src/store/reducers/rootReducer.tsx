import { combineReducers } from 'redux';
import userReducer, { UserReducerState } from './userReducer';
import roomsReducer, { RoomsReducerState } from './roomsReducer';

export default combineReducers({
  user: userReducer,
  rooms: roomsReducer,
});

export type RootReducerType = {
  user: UserReducerState;
  rooms: RoomsReducerState;
};
