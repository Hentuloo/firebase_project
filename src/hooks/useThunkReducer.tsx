import { useReducer, useRef, Reducer } from 'react';

export const useThunkReducer = <T extends {}>(
  reducer: any,
  initialState: T,
): [T, React.Dispatch<any>] => {
  const [state, dispatch] = useReducer<Reducer<T, any>>(
    reducer,
    initialState,
  );
  const thunkDispatchRef = useRef<any>();

  const thunkDispatch = (action: any) =>
    typeof action === 'function'
      ? action(thunkDispatchRef.current, state)
      : dispatch(action);

  thunkDispatchRef.current = thunkDispatch;

  return [state, thunkDispatch];
};
