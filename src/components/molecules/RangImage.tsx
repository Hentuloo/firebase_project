import React, { FC, useMemo } from 'react';
import styled from 'styled-components';

import level1 from 'assets/svg/levels/level1.svg';
import level2 from 'assets/svg/levels/level2.svg';
import level3 from 'assets/svg/levels/level3.svg';
import Tippy from '@tippyjs/react';
import { useSelector } from 'react-redux';
import { getSoloTrainingLevel } from 'store/selectors/soloTraining.selector';

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
  const level = useSelector(getSoloTrainingLevel);

  const levelImage = useMemo(() => {
    if (!level) return;
    if (level > 34) return level3;
    if (level > 22) return level2;
    return level1;
  }, [level]);

  return (
    <Tippy content="Ranga rozgrywek solowych">
      <Wrapper {...props}>
        <Image src={levelImage} alt="Ranga" />
      </Wrapper>
    </Tippy>
  );
};
