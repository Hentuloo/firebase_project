import { createContext } from 'react';

export const ModalContext = createContext({
  isActive: false,
  save: () => {},
  close: () => {},
  toggle: () => {},
});
