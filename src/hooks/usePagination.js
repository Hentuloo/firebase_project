import { useCallback } from 'react';
import { isInRange } from './utils';
import { useThunkReducer } from './useThunkReducer';

const actionTypes = {
  SET_STEP: 'SET_STEP',
  TOGGLE_THROTTLED: 'TOGGLE_THROTTLED',
};

const reducer = (state, action) => {
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
};

const initValue = (init, activeCount) => ({
  from: init || 0,
  to: init + activeCount || 0,
  prev: null,
  throttled: false,
});

const setStepAction = (
  newStep,
  activeCount,
  throttledTime,
) => dispatch => {
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

export const usePagination = ({
  init,
  defaultSkipCount,
  activeCount = 1,
  maxCount,
  minCount = 0,
  delay = 850,
}) => {
  const [{ from, to, prev, throttled }, dispatch] = useThunkReducer(
    reducer,
    initValue(init, activeCount),
  );
  const setNewStep = useCallback(
    newStep => {
      if (throttled) return;
      dispatch(setStepAction(newStep, activeCount, delay));
    },
    [activeCount, throttled, delay],
  );

  const changeStep = newStep => {
    if (
      maxCount !== undefined &&
      isInRange(newStep, activeCount, maxCount, minCount)
    ) {
      return setNewStep(newStep);
    }
  };

  const nextStep = skipCount => {
    changeStep(
      skipCount ? from + skipCount : from + defaultSkipCount,
    );
  };
  const prevStep = skipCount => {
    changeStep(
      skipCount ? from - skipCount : from - defaultSkipCount,
    );
  };

  return { from, to, prev, nextStep, prevStep };
};
