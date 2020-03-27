import { useReducer, useCallback } from 'react';

const actionTypes = {
  SET_STEP: 'SET_STEP',
};

const reducer = (state, action) => {
  if (action.type === actionTypes.SET_STEP) {
    const { from, to } = action.payload;
    return { ...state, from, to: to || 0, prev: state.from };
  }
};

const initValue = (init, activeCount) => ({
  from: init || 0,
  to: init + activeCount || 0,
  prev: null,
});

export const usePagination = ({
  init,
  defaultSkipCount,
  activeCount = 1,
  maxCount,
  minCount = 0,
}) => {
  const [{ from, to, prev }, dispatch] = useReducer(
    reducer,
    initValue(init, activeCount),
  );

  const setNewStep = useCallback(
    newStep => {
      dispatch({
        type: actionTypes.SET_STEP,
        payload: { from: newStep, to: newStep + activeCount },
      });
    },
    [activeCount],
  );

  const isInRange = useCallback(
    value => {
      if (
        value !== maxCount &&
        value < maxCount + activeCount &&
        value > minCount - activeCount
      ) {
        return true;
      }
      return false;
    },
    [maxCount, minCount, activeCount],
  );

  const changeStep = newStep => {
    if (maxCount !== undefined) {
      if (isInRange(newStep)) return setNewStep(newStep);
      return;
    }
    setNewStep(newStep);
  };

  const nextStep = skipCount =>
    changeStep(
      skipCount ? from + skipCount : from + defaultSkipCount,
    );
  const prevStep = skipCount =>
    changeStep(
      skipCount ? from - skipCount : from - defaultSkipCount,
    );

  return { from, to, prev, nextStep, prevStep };
};
