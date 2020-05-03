import React, { memo } from 'react';
import styled, { css } from 'styled-components';
import { stickyModal } from 'components/molecules';
import { ClearButton } from '../../atoms/Button/Button.styled';
import { LetterObjectWithActive, ToggleLetter } from './types';

const Wrapper = styled.div`
  ${stickyModal}
  height: 74%;
  display: grid;
  grid-auto-flow: column;
  align-self: center;
  &::before {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
`;

const StyledClearButton = styled(ClearButton)`
  font-weight: ${({ theme }) => theme.fw[1]} !important;
  ${({ active }: { active?: boolean }) =>
    active &&
    css`
      color: ${({ theme }) => theme.color.brand[0]};
    `}
`;
interface LettersButtonsProps {
  lettersArray: LetterObjectWithActive[];
  onClick: ToggleLetter;
}

export const LettersButtons = ({
  lettersArray,
  onClick,
  ...props
}: LettersButtonsProps) => {
  if (lettersArray.length === 0) return null;

  return (
    <Wrapper {...props}>
      {lettersArray.map(({ id, letter, active }) => (
        <StyledClearButton
          onClick={e => onClick(e, id)}
          key={letter}
          active={active}
          type="button"
        >
          {letter}
        </StyledClearButton>
      ))}
    </Wrapper>
  );
};

export const MemomizedLettersButtons = memo(
  LettersButtons,
  (prev, next) =>
    prev.lettersArray.every(
      (letter, i) => letter.active === next.lettersArray[i].active,
    ),
);
