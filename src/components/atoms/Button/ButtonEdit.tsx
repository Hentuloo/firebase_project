import React, { FC } from 'react';
import { ClearButton, ButtonProps } from 'components/atoms';

export const ButtonEdit: FC<ButtonProps> = ({
  title = 'Edytuj',
  ...props
}) => {
  return (
    <ClearButton title={title} {...props}>
      <span className="sr-only">{title}</span>
      <i className="fa fa-pencil" aria-hidden="true" />
    </ClearButton>
  );
};
