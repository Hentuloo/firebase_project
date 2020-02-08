import { useContext } from 'react';
import { ModalContext } from './Context';

export const Toggler = ({ render }) => {
  const { toggle } = useContext(ModalContext);
  return render(toggle);
};
