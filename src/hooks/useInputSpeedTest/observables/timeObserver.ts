import { interval } from 'rxjs';
import { Action, types } from '../types';
import { timeSteps } from '../config';

export type TimeObserverAction = SubtractTimeAction;

interface SubtractTimeAction {
  type: types.SUBTRACT_TIME_STEPS;
}

export const timeObserver = (dispatch: React.Dispatch<Action>) => {
  const interval$ = interval(timeSteps.StepUnitOfTime);
  return interval$.subscribe(() => {
    dispatch({
      type: types.SUBTRACT_TIME_STEPS,
    } as SubtractTimeAction);
  });
};
