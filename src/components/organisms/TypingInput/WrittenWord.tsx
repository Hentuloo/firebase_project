import React, { memo, FC } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  right: 0%;
`;
const InputWord = styled.span`
  display: block;
`;

interface PointCircle {
  red?: boolean;
}
const PointCircle = styled.div<PointCircle>`
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

interface WrittenWordProps {
  activeWord: string;
  wordInSourceText: string;
}

const WrittenWord: FC<WrittenWordProps> = ({
  activeWord,
  wordInSourceText,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <InputWord>{activeWord}</InputWord>
      <PointCircle red={activeWord.trim() !== wordInSourceText} />
    </Wrapper>
  );
};

export const MemomizedWrittenWord = memo(
  WrittenWord,
  (prev, next) => prev.activeWord === next.activeWord,
);

export default WrittenWord;
