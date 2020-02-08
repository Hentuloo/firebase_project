import { useState } from 'react';

export const ToggleElement = ({ render }) => {
  const [isActive, setActive] = useState(false);

  const toggle = () => setActive(!isActive);

  return render({ toggle, isActive });
};
