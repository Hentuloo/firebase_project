import React, { FC } from 'react';
import { ClearButton } from 'components/atoms';

export interface ButtonEditProps {
  title: string;
  onClick?: (props: any) => any;
}

export const ButtonEdit: FC<ButtonEditProps> = ({
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
