import React, { FC } from 'react';
import styled from 'styled-components';

import googleIconSVG from 'assets/svg/icons/googleIconGreen.svg';

const Wrapper = styled.div`
  text-align: center;
`;
const Image = styled.img``;

interface GoogleLoadingProps {
  active?: boolean;
  className?: string;
}

export const GoogleLoading: FC<GoogleLoadingProps> = ({
  active,
  className = '',
}) => {
  if (!active) return null;
  return (
    <Wrapper className={className}>
      <Image src={googleIconSVG} />
    </Wrapper>
  );
};
