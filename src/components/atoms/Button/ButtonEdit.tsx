import React, { FC } from 'react';
import { ClearButton, ButtonProps } from 'components/atoms';
import Tippy from '@tippyjs/react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
`;

export const ButtonEdit: FC<ButtonProps> = ({
  title = 'Edytuj',
  to,
  ...props
}) => {
  return (
    <Tippy content={title} delay={300} disabled={title === undefined}>
      <Wrapper {...props}>
        <ClearButton title={title} to={to}>
          <span className="sr-only">{title}</span>
          <i className="fa fa-pencil" aria-hidden="true" />
        </ClearButton>
      </Wrapper>
    </Tippy>
  );
};
