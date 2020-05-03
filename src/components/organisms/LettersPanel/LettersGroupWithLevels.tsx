import React, { Fragment, FC } from 'react';
import styled from 'styled-components';

import { chunkArray } from 'utils';

import firstLevel from 'assets/svg/levels/level1.svg';
import secondLevel from 'assets/svg/levels/level2.svg';
import ThirdLevel from 'assets/svg/levels/level3.svg';
import { MemomizedLettersButtons as LettersButtons } from './LettersButtons';
import { ToggleLetter, LetterObjectWithActive } from './types';

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
  letters: LetterObjectWithActive[];
  toggleLetter: ToggleLetter;
}
const LettersGroupWithLevels: Function = ({
  letters,
  toggleLetter,
}: LettersPanelProps): JSX.Element[] => {
  const chunkedArray = chunkArray<LetterObjectWithActive>(letters, 4);

  return chunkedArray.map((LettersGroup, index) => {
    const GroupComponent = () => (
      <LettersButtons
        onClick={toggleLetter}
        lettersArray={LettersGroup}
      />
    );

    if (index === 2) {
      return (
        <Fragment key={LettersGroup[0].id}>
          <ImageComponent src={firstLevel} />
          <GroupComponent />
        </Fragment>
      );
    }

    if (index === 5) {
      return (
        <Fragment key={LettersGroup[0].id}>
          <ImageComponent src={secondLevel} />
          <GroupComponent />
        </Fragment>
      );
    }

    if (index === 8) {
      return (
        <Fragment key={LettersGroup[0].id}>
          <ImageComponent src={ThirdLevel} />
          <GroupComponent />
        </Fragment>
      );
    }

    return <GroupComponent key={LettersGroup[0].id} />;
  });
};

export default LettersGroupWithLevels;
