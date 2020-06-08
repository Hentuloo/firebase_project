import { useCallback } from 'react';
import { isInRange } from './utils';
import { useThunkReducer } from './useThunkReducer';

const actionTypes = {
  SET_STEP: 'SET_STEP',
  TOGGLE_THROTTLED: 'TOGGLE_THROTTLED',
};

export interface UsePaginationState {
  from: number;
  to: number;
  prev: number | null;
  throttled: boolean;
}

const reducer = (
  state: UsePaginationState,
  action: any,
): UsePaginationState => {
  if (action.type === actionTypes.TOGGLE_THROTTLED) {
    return {
      ...state,
      throttled: !state.throttled,
    };
  }
  if (action.type === actionTypes.SET_STEP) {
    if (state.throttled) return state;
    const { from, to } = action.payload;
    return {
      ...state,
      from,
      to: to || 0,
      prev: state.from,
      throttled: true,
    };
  }
  return state;
};

const initValue = (init: number, activeCount: number) => ({
  from: init || 0,
  to: init + activeCount || 0,
  prev: null,
  throttled: false,
});

const setStepAction = (
  newStep: number,
  activeCount: number,
  throttledTime: number,
) => (dispatch: any) => {
  dispatch({
    type: actionTypes.SET_STEP,
    payload: {
      from: newStep,
      to: newStep + activeCount,
      throttled: !!throttledTime,
    },
  });
  if (throttledTime) {
    setTimeout(() => {
      dispatch({
        type: actionTypes.TOGGLE_THROTTLED,
      });
    }, throttledTime);
  }
};

export interface UsePaginationProps {
  init: number;
  defaultSkipCount?: number;
  activeCount?: number;
  maxCount?: number;
  minCount?: number;
  delay?: number;
}

export const usePagination = ({
  init,
  defaultSkipCount = 1,
  activeCount = 1,
  maxCount,
  minCount = 0,
  delay = 850,
}: UsePaginationProps) => {
  const [{ from, to, prev, throttled }, dispatch] = useThunkReducer<
    UsePaginationState
  >(reducer, initValue(init, activeCount));

  const setNewStep = useCallback(
    newStep => {
      if (throttled) return;
      dispatch(setStepAction(newStep, activeCount, delay));
    },
    [activeCount, throttled, delay, dispatch],
  );

  const changeStep = useCallback(
    (newStep: number) => {
      if (
        maxCount !== undefined &&
        isInRange(newStep, activeCount, maxCount, minCount)
      ) {
        return setNewStep(newStep);
      }
    },
    [activeCount, maxCount, minCount, setNewStep],
  );

  const nextStep = useCallback(
    (skipCount?: number) => {
      changeStep(
        skipCount ? from + skipCount : from + defaultSkipCount,
      );
    },
    [changeStep, defaultSkipCount, from],
  );

  const prevStep = useCallback(
    (skipCount?: number) => {
      changeStep(
        skipCount ? from - skipCount : from - defaultSkipCount,
      );
    },
    [changeStep, defaultSkipCount, from],
  );

  return { from, to, prev, nextStep, prevStep };
};
