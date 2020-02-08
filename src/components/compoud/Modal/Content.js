import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { ModalContext } from './Context';

export const WrapperStyles = styled.div`
  position: fixed;
  display: grid;
  width: 94%;
  max-width: 400px;
  min-height: 150px;
  grid-template-rows: auto 40px;
  left: 50%;
  top: 50%;
  margin: 0px auto;
  border-radius: 6px;
  transform: translate(-50%, calc(-50% - 200px));
  background-color: rgb(240, 240, 240);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.3s ease, opacity 0.2s ease;
  ${({ isActive }) =>
    isActive &&
    css`
      pointer-events: auto;
      transform: translate(-50%, calc(-50%));
      opacity: 1;
    `}
`;
export const ChildrensStyles = styled.div`
  padding: 10px;
`;

export const ControllersStyles = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ButtonStyles = styled.button`
  border: none;
  padding: 0px 7px;
  background-color: transparent;
  color: #065fd4;
  cursor: pointer;
  ${({ bold }) =>
    bold &&
    css`
      font-weight: bold;
    `}
`;

export const Content = ({ children, className }) => {
  const { isActive, close, save } = useContext(ModalContext);
  return (
    <WrapperStyles isActive={isActive} className={className}>
      <ChildrensStyles>{children}</ChildrensStyles>
      <ControllersStyles>
        <ButtonStyles type="button" onClick={close}>
          Anuluj
        </ButtonStyles>
        <ButtonStyles bold type="submit" onClick={save}>
          Zapisz
        </ButtonStyles>
      </ControllersStyles>
    </WrapperStyles>
  );
};
Content.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
Content.defaultProps = {
  className: '',
};
