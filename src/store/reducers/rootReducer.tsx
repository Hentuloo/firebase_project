import { combineReducers } from 'redux';
import userReducer, { UserReducerState } from './userReducer';
import roomsReducer, { RoomsReducerState } from './roomsReducer';
import soloTrainingReducer, {
  SoloTrainingState,
} from './soloTraining';

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
