import React, { FC } from 'react';
import styled from 'styled-components';
import { CircleButton, ButtonProps } from './Button.styled';

const Wrapper = styled.div``;

const StyledCircleButton = styled(CircleButton)`
  display: grid;
  align-items: center;
  background-color: ${({ theme }) => theme.color.white[0]};
  font-size: ${({ theme }) => theme.fs.xl};
`;

const Image = styled.img`
  display: block;
  margin: 0px auto;
`;

export interface CircledButtonWithImageProps extends ButtonProps {
  onClick: () => void;
  src: string;
  title?: string;
  alt?: string;
  disabled?: boolean;
}

export const CircledButtonWithImage: FC<CircledButtonWithImageProps> = ({
  onClick,
  src,
  title = 'Przycisk',
  alt = '',
  disabled = false,
  as,
  to,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <StyledCircleButton
        as={as}
        to={to}
        onClick={onClick}
        title={title}
        disabled={disabled}
      >
        <Image src={src} alt={alt} />
      </StyledCircleButton>
    </Wrapper>
  );
};
