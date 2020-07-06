import React, { FC } from 'react';
import styled from 'styled-components';
import logoSVG from 'assets/svg/icons/logo.svg';

const Wrapper = styled.div`
  position: fixed;
  display: grid;
  width: 100%;
  height: 100%;
  justify-items: center;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 80px;
  opacity: 0.2;
`;

export interface FixedBrandLogoProps {
  alt?: string;
}

export const FixedBrandLogo: FC<FixedBrandLogoProps> = ({
  alt,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <div>
        <LogoImage src={logoSVG} alt={alt || 'Ładowanie'} />
      </div>
    </Wrapper>
  );
};
