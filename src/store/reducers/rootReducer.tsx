import { combineReducers } from 'redux';
import userReducer, { UserReducerState } from './user.reducer';
import roomsReducer, { RoomsReducerState } from './rooms.reducer';
import gameSettingsReducer, {
  GameSettingsState,
} from './gameSettings.reducer';
import soloTrainingReducer, {
  SoloTrainingState,
} from './soloTraining.reducer';
import gameScoresReducer, {
  GameScoreState,
} from './gameScores.reducer';
import generalStateReducer, {
  GeneralStateReducer,
} from './generalState.reducer';

export default combineReducers({
  user: userReducer,
  rooms: roomsReducer,
  soloTraining: soloTrainingReducer,
  gameSettings: gameSettingsReducer,
  gameScore: gameScoresReducer,
  generalState: generalStateReducer,
});

export type RootReducerType = {
  user: UserReducerState;
  rooms: RoomsReducerState;
  soloTraining: SoloTrainingState;
  gameSettings: GameSettingsState;
  gameScore: GameScoreState;
  generalState: GeneralStateReducer;
};
