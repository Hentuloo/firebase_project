import React from 'react';
import PropTypes from 'prop-types';
import { ClearButton } from 'components/atoms';

export const ButtonEdit = ({ title, ...props }) => {
  return (
    <ClearButton title={title} {...props}>
      <span className="sr-only">{title}</span>
      <i className="fa fa-pencil" aria-hidden="true" />
    </ClearButton>
  );
};
ButtonEdit.propTypes = {
  title: PropTypes.string,
};
ButtonEdit.defaultProps = {
  title: 'Edytuj',
};
