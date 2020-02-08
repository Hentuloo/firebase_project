import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ModalContext } from './Context';

export const Wrapper = ({
  children,
  defaultOpen,
  onSubmit,
  onClose,
  onToggle,
}) => {
  const [isActive, setActive] = useState(defaultOpen);

  const close = () => {
    onClose();
    setActive(false);
  };

  const toggle = () => {
    onToggle(isActive);
    setActive(!isActive);
  };

  const save = () => {
    const closeModal = () => setActive(false);
    onSubmit(closeModal);
  };

  const ModalContextValue = {
    isActive,
    close,
    toggle,
    save,
  };

  return (
    <ModalContext.Provider value={ModalContextValue}>
      {children}
    </ModalContext.Provider>
  );
};
Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  defaultOpen: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  onToggle: PropTypes.func,
};
Wrapper.defaultProps = {
  defaultOpen: false,
  onSubmit: () => {},
  onClose: () => {},
  onToggle: () => {},
};
