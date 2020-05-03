import { listenHotKey } from 'utils';
import { Action } from '../types';
import {
  resetGameStateAction,
  setNewInitialTimeAction,
} from '../actions';

export const hotkeyObserver = (dispatch: React.Dispatch<Action>) => {
  // resetGame
  const reset$ = listenHotKey(['Control', 'r']);
  const increaseTime$ = listenHotKey(['Control', 'ArrowUp']);
  const decreseTime$ = listenHotKey(['Control', 'ArrowDown']);

  const subs = reset$
    .subscribe(e => {
      e.forEach(event => event.preventDefault());
      dispatch(resetGameStateAction());
    })
    .add(
      increaseTime$.subscribe(() =>
        dispatch(setNewInitialTimeAction(true)),
      ),
    )
    .add(
      decreseTime$.subscribe(() =>
        dispatch(setNewInitialTimeAction(false)),
      ),
    );

  return subs;
};
