import React, { FC } from 'react';
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

interface TextDone {
  wrong?: boolean;
}
const TextDone = styled.div<TextDone>`
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

interface PanelWithTextToWriteProps {
  todo: string;
  doneGood: string;
  doneWrong: string;
}

const PanelWithTextToWrite: FC<PanelWithTextToWriteProps> = ({
  todo,
  doneGood,
  doneWrong,
}) => {
  return (
    <AvaiableText>
      <TextTodo>{todo}</TextTodo>
      <TextDone>{doneGood}</TextDone>
      <TextDone wrong>{doneWrong}</TextDone>
    </AvaiableText>
  );
};

export default PanelWithTextToWrite;
