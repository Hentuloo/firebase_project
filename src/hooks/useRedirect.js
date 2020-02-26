import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

export const useRedirect = () => {
  const history = useHistory();
  const redirect = useCallback(path => {
    history.push(path);
  }, []);
  return redirect;
};
