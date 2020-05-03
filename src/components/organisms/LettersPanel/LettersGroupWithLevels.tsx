import React, { Fragment, FC } from 'react';
import styled from 'styled-components';

import { chunkArray } from 'utils';

import firstLevel from 'assets/svg/levels/level1.svg';
import secondLevel from 'assets/svg/levels/level2.svg';
import ThirdLevel from 'assets/svg/levels/level3.svg';
import { LettersButtons } from './LettersButtons';
import { ToggleLetter, LetterWithStatusFlags } from './types';

const ImageWrapper = styled.div`
  text-align: center;
  overflow: hidden;
  pointer-events: none;
`;
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const ImageComponent: FC<{ src: string }> = ({ src, ...props }) => (
  <ImageWrapper {...props}>
    <Image src={src} />
  </ImageWrapper>
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
          <ImageComponent src={firstLevel} />
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
          <ImageComponent src={secondLevel} />
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
          <ImageComponent src={ThirdLevel} />
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
