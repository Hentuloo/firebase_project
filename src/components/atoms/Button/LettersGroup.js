import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { stickyModal } from 'components/molecules';
import { ClearButton } from './Button';

const Wrapper = styled.div`
  ${stickyModal}
  display: grid;
  height: 45px;
  grid-auto-flow: column;
`;
const StyledClearButton = styled(ClearButton)`
  font-weight: 600 !important;
  ${({ active }) =>
    active &&
    css`
      color: ${({ theme }) => theme.color.brand[0]};
    `}
`;
export const LettersGroup = ({ lettersArray, onClick, ...props }) => {
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

LettersGroup.propTypes = {
  onClick: PropTypes.func.isRequired,
  lettersArray: PropTypes.arrayOf(
    PropTypes.shape({
      letter: PropTypes.string,
      active: PropTypes.bool,
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
