import { useSelector, useDispatch } from 'react-redux';
import { getUser } from 'store/selectors/user.selector';
import { getSoloTraining } from 'store/selectors/soloTraining.selector';
import { useEffect } from 'react';
import { getSoloTrainingSnap } from 'store/actions/soloTraining.actions';

export const useSoloTrainingSnaps = () => {
  const { fetched, level, snaps } = useSelector(getSoloTraining);
  const { uid } = useSelector(getUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!uid) return;
    if (!fetched) {
      dispatch(getSoloTrainingSnap(uid));
    }
  }, [level, fetched, uid, dispatch]);

  return { fetched, level, snaps };
};
