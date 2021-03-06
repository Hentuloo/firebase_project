import React from 'react';
import styled, { css } from 'styled-components';
import { stickyModal } from 'components/molecules';
import { ClearButton } from '../../atoms/Button/Button.styled';
import { LetterWithStatusFlags, ToggleLetter } from './types';

const Wrapper = styled.div`
  ${stickyModal}
  height: 74%;
  display: grid;
  grid-auto-flow: column;
  align-self: center;
  &::before {
    box-shadow: ${({ theme }) => theme.color.shadow[0]};
  }
`;
interface StyledClearButtonProps {
  active?: boolean;
}
const StyledClearButton = styled(ClearButton)<StyledClearButtonProps>`
  position: relative;
  font-weight: ${({ theme }) => theme.fw[1]} !important;
  ${({ active }) =>
    active &&
    css`
      color: ${({ theme }) => theme.color.contrastBrand[1]};
    `}
`;
const BlockedIcon = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: ${({ theme }) => theme.fs.xxxs};
  transform: translate(-120%, -50%);
  ${({ theme }) => theme.mediaQuery.md} {
    font-size: ${({ theme }) => theme.fs.mini};
    transform: translate(-100%, -50%);
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    transform: translate(-70%, -50%);
    font-size: 0.4em;
  }
`;

interface LettersButtonsProps {
  lettersArray: LetterWithStatusFlags[];
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
      {lettersArray.map(({ id, letter, active, blocked }) => (
        <StyledClearButton
          onClick={(e: any) => onClick(e, id)}
          key={letter}
          type="button"
          active={active ? 1 : 0}
        >
          {letter}
          {blocked && (
            <BlockedIcon className="fa fa-lock" aria-hidden="true" />
          )}
        </StyledClearButton>
      ))}
    </Wrapper>
  );
};
