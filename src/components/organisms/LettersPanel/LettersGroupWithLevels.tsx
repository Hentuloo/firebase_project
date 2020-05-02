import React, { Fragment, FC } from 'react';
import styled from 'styled-components';

import { MemomizedLettersGroup } from 'components/atoms';
import { chunkArray } from 'utils';

import firstLevel from 'assets/svg/levels/level1.svg';
import secondLevel from 'assets/svg/levels/level2.svg';
import ThirdLevel from 'assets/svg/levels/level3.svg';

const ImageWrapper = styled.div`
  text-align: center;
  overflow: hidden;
  pointer-events: none;
`;
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
const StyledMomomizedGroup = styled(MemomizedLettersGroup)`
  height: 74%;
  align-self: center;
  &::before {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
`;

interface ImageComponentProps {
  src: string;
}

const ImageComponent: FC<ImageComponentProps> = ({
  src,
  ...props
}) => (
  <ImageWrapper {...props}>
    <Image src={src} />
  </ImageWrapper>
);

interface LettersGroupWithLevelsProps {
  lettersArray: string[];
  toggleLetter: (e: any) => any;
}
const LettersGroupWithLevels: Function = ({
  lettersArray,
  toggleLetter,
}: LettersGroupWithLevelsProps): JSX.Element[] => {
  const chunkedArray = chunkArray(lettersArray, 4);

  return chunkedArray.map((letters, index) => {
    if (index === 2) {
      return (
        <Fragment key={letters[0].id}>
          <ImageComponent src={firstLevel} />
          <StyledMomomizedGroup
            onClick={toggleLetter}
            lettersArray={letters}
          />
        </Fragment>
      );
    }
    if (index === 5) {
      return (
        <Fragment key={letters[0].id}>
          <ImageComponent src={secondLevel} />
          <StyledMomomizedGroup
            onClick={toggleLetter}
            lettersArray={letters}
          />
        </Fragment>
      );
    }
    if (index === 8) {
      return (
        <Fragment key={letters[0].id}>
          <ImageComponent src={ThirdLevel} />
          <StyledMomomizedGroup
            onClick={toggleLetter}
            lettersArray={letters}
          />
        </Fragment>
      );
    }
    return (
      <StyledMomomizedGroup
        key={letters[0].id}
        onClick={toggleLetter}
        lettersArray={letters}
      />
    );
  });
};

export default LettersGroupWithLevels;
