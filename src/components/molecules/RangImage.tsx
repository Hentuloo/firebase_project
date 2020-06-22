import React, { FC } from 'react';
import styled from 'styled-components';

import level1 from 'assets/svg/levels/level1.svg';
import Tippy from '@tippyjs/react';

const Wrapper = styled.div`
  position: relative;
`;
const Image = styled.img`
  max-width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const RangImage: FC = ({ ...props }) => {
  return (
    <Tippy content="Ranga rozgrywek solowych">
      <Wrapper {...props}>
        <Image src={level1} alt="Ranga" />
      </Wrapper>
    </Tippy>
  );
};
