import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const AvaiableText = styled.div`
  white-space: pre;
  position: relative;
  overflow: hidden;
`;
const TextTodo = styled.div`
  white-space: pre;
  position: absolute;
  top: 0%;
  left: 50%;
`;
const TextDone = styled.div`
  white-space: pre;
  position: absolute;
  right: 50%;
  top: 0%;
  text-align: right;
  ${({ wrong }) =>
    wrong &&
    css`
      color: red;
    `}
`;

const PanelWithTextToWrite = ({ todo, doneGood, doneWrong }) => {
  return (
    <AvaiableText>
      <TextTodo>{todo}</TextTodo>
      <TextDone>{doneGood}</TextDone>
      <TextDone wrong>{doneWrong}</TextDone>
    </AvaiableText>
  );
};

PanelWithTextToWrite.propTypes = {
  todo: PropTypes.string.isRequired,
  doneGood: PropTypes.string.isRequired,
  doneWrong: PropTypes.string.isRequired,
};

export default PanelWithTextToWrite;
