import { useReducer, useRef } from 'react';

export const useThunkReducer = <T,>(
  reducer: any,
  initialState: T,
): [T, React.Dispatch<any>] => {
  // @ts-ignore
  const [state, dispatch] = useReducer<T>(reducer, initialState);
  const thunkDispatchRef = useRef<any>();

  const thunkDispatch = (action: any) =>
    typeof action === 'function'
      ? action(thunkDispatchRef.current, state)
      : dispatch(action);

  thunkDispatchRef.current = thunkDispatch;

  return [state, thunkDispatch];
};
