import ReactDOM from 'react-dom';
import { ReactNode } from 'react';

export interface PortalProps {
  children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const modalWrapper = document.querySelector('#modal');
  if (!modalWrapper) return null;

  return ReactDOM.createPortal(children, modalWrapper);
};

export default Portal;
