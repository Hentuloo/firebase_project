import { interval } from 'rxjs';
import { Action, types } from '../types';
import { timeStepsConfig } from '../config';

export type TimeObserverAction = SubtractTimeAction;

interface SubtractTimeAction {
  type: types.SUBTRACT_TIME_STEPS;
}

export const timeObserver = (dispatch: React.Dispatch<Action>) => {
  const timeStep$ = interval(timeStepsConfig.StepUnitOfTime);

  return timeStep$.subscribe(() => {
    dispatch({
      type: types.SUBTRACT_TIME_STEPS,
    } as SubtractTimeAction);
  });
};
