import React, { memo } from 'react';
import styled, { css } from 'styled-components';
import { stickyModal } from 'components/molecules';
import { ClearButton } from './Button.styled';

const Wrapper = styled.div`
  ${stickyModal}
  display: grid;
  height: 45px;
  grid-auto-flow: column;
`;

const StyledClearButton = styled(ClearButton)`
  font-weight: ${({ theme }) => theme.fw[1]} !important;
  ${({ active }: { active?: boolean }) =>
    active &&
    css`
      color: ${({ theme }) => theme.color.brand[0]};
    `}
`;
interface LettersGroupProps {
  lettersArray: {
    letter: string;
    active: boolean;
    id: number;
  }[];
  onClick: (e: any, id: number | string) => any;
}

export const LettersGroup = ({
  lettersArray,
  onClick,
  ...props
}: LettersGroupProps) => {
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

export const MemomizedLettersGroup = memo(
  LettersGroup,
  (prev, next) =>
    prev.lettersArray.every(
      (letter, i) => letter.active === next.lettersArray[i].active,
    ),
);
