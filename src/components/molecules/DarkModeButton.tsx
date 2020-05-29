import React, { FC, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getDarkModeState } from 'store/selectors/user.selector';
import darkSvg from 'assets/svg/darkMode/dark.svg';
import lightSvg from 'assets/svg/darkMode/light.svg';
import { ClearButton } from 'components/atoms';
import { toggleDarkMode } from 'store/actions/user.actions';

const Wrapper = styled(ClearButton)`
  display: grid;
  justify-items: center;
  align-items: center;
  width: 40px;
  width: 40px;
  z-index: 10;
  transition: transform 0.2s linear;
  padding: 5px;
  ${({ small }) =>
    small &&
    css`
      width: 27px;
      width: 27px;
    `}
  &:hover {
    transform: scale(0.9);
  }
  ${({ theme }) => theme.mediaQuery.lg} {
    width: 50px;
    width: 50px;
    ${({ small }) =>
      small &&
      css`
        width: 35px;
        width: 35px;
      `}
  }
`;
const Image = styled.img`
  width: 100%;
`;

export interface DarkModeButtonProps {
  small?: boolean;
}

export const DarkModeButton: FC<DarkModeButtonProps> = ({
  small = false,
  ...props
}) => {
  const dispatch = useDispatch();
  const mode = useSelector(getDarkModeState);

  const handleToggle = useCallback(() => {
    dispatch(toggleDarkMode());
  }, [dispatch]);

  const isDark = mode === 'DARK';

  return (
    <Wrapper small={small} onClick={handleToggle} {...props}>
      <Image
        src={isDark ? lightSvg : darkSvg}
        alt={
          isDark
            ? 'Zmień na jasny motyw strony'
            : 'Zmień na ciemny motyw strony'
        }
      />
    </Wrapper>
  );
};
