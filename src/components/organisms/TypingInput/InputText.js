import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  right: 0%;
`;
const InputWord = styled.span`
  display: block;
`;
const PointCircle = styled.div`
  position: absolute;
  left: 50%;
  top: 0%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.brand[1]};
  transform: translate(0%, -50%);
  opacity: 0;
  ${({ red }) =>
    red &&
    css`
      background-color: red;
    `}
`;

const InputText = ({ activeWord, wordInSourceText, ...props }) => {
  return (
    <Wrapper {...props}>
      <InputWord>{activeWord}</InputWord>
      <PointCircle red={activeWord.trim() !== wordInSourceText} />
    </Wrapper>
  );
};

InputText.propTypes = {
  activeWord: PropTypes.string.isRequired,
  wordInSourceText: PropTypes.string.isRequired,
};

export const MemomizedInputText = memo(
  InputText,
  (prev, next) => prev.activeWord === next.activeWord,
);

export default InputText;
