import React, { Fragment, FC } from 'react';
import styled from 'styled-components';

import { chunkArray } from 'utils';

import firstLevel from 'assets/svg/levels/level1.svg';
import secondLevel from 'assets/svg/levels/level2.svg';
import ThirdLevel from 'assets/svg/levels/level3.svg';
import Tippy from '@tippyjs/react';
import { LettersButtons } from './LettersButtons';
import { ToggleLetter, LetterWithStatusFlags } from './types';

const ImageWrapper = styled.div`
  text-align: center;
`;
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const ImageComponent: FC<{ src: string; title?: string }> = ({
  src,
  title,
  ...props
}) => (
  <Tippy {...props} content={title}>
    <ImageWrapper>
      <Image src={src} />
    </ImageWrapper>
  </Tippy>
);

export interface LettersPanelProps {
  activeIndex: number;
  letters: LetterWithStatusFlags[];
  toggleLetter: ToggleLetter;
}
const LettersGroupWithLevels: Function = ({
  letters,
  toggleLetter,
}: LettersPanelProps): JSX.Element[] => {
  const chunkedArray = chunkArray<LetterWithStatusFlags>(letters, 4);

  return chunkedArray.map((LettersGroup, index) => {
    if (index === 2) {
      return (
        <Fragment key={LettersGroup[0].id}>
          <ImageComponent src={firstLevel} title="Pierwszy poziom" />
          <LettersButtons
            onClick={toggleLetter}
            lettersArray={LettersGroup}
          />
        </Fragment>
      );
    }

    if (index === 5) {
      return (
        <Fragment key={LettersGroup[0].id}>
          <ImageComponent src={secondLevel} title="Drugi poziom" />
          <LettersButtons
            onClick={toggleLetter}
            lettersArray={LettersGroup}
          />
        </Fragment>
      );
    }

    if (index === 8) {
      return (
        <Fragment key={LettersGroup[0].id}>
          <ImageComponent src={ThirdLevel} title="Trzeci poziom" />
          <LettersButtons
            onClick={toggleLetter}
            lettersArray={LettersGroup}
          />
        </Fragment>
      );
    }

    return (
      <LettersButtons
        key={LettersGroup[0].id}
        onClick={toggleLetter}
        lettersArray={LettersGroup}
      />
    );
  });
};

export default LettersGroupWithLevels;
