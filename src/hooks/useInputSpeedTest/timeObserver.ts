import { interval } from 'rxjs';
import { Action, types } from './types';

export type TimeObserverAction = SubtractTimeAction;

interface SubtractTimeAction {
  type: types.SUBTRACT_TIME_STEPS;
}

export const timeObserver = (
  steps: number,
  dispatch: React.Dispatch<Action>,
) => {
  const interval$ = interval(1000);
  return interval$.subscribe(() => {
    dispatch({
      type: types.SUBTRACT_TIME_STEPS,
    } as SubtractTimeAction);
  });
};
