import { combineReducers } from 'redux';
import userReducer, { UserReducerState } from './user.reducer';
import roomsReducer, { RoomsReducerState } from './rooms.reducer';
import soloTrainingReducer, {
  SoloTrainingState,
} from './soloTraining.reducer';

export default combineReducers({
  user: userReducer,
  rooms: roomsReducer,
  soloTraining: soloTrainingReducer,
});

export type RootReducerType = {
  user: UserReducerState;
  rooms: RoomsReducerState;
  soloTraining: SoloTrainingState;
};
