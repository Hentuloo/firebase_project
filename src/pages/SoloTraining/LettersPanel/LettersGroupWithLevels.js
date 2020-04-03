import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MemomizedLettersGroup } from 'components/atoms';
import { chunkArray } from 'config/utils';

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
const ImageComponent = ({ src, ...props }) => (
  <ImageWrapper {...props}>
    <Image src={src} />
  </ImageWrapper>
);
ImageComponent.propTypes = {
  src: PropTypes.string.isRequired,
};

const LettersGroupWithLevels = ({ lettersArray, toggleLetter }) => {
  const chunkedArray = chunkArray(lettersArray, 4);

  return chunkedArray.map((letters, index) => {
    if (index === 2) {
      return (
        <>
          <ImageComponent key={letters[1].id} src={firstLevel} />
          <StyledMomomizedGroup
            key={letters[0].id}
            onClick={toggleLetter}
            lettersArray={letters}
          />
        </>
      );
    }
    if (index === 5) {
      return (
        <>
          <ImageComponent key={letters[1].id} src={secondLevel} />
          <StyledMomomizedGroup
            key={letters[0].id}
            onClick={toggleLetter}
            lettersArray={letters}
          />
        </>
      );
    }
    if (index === 8) {
      return (
        <>
          <ImageComponent key={letters[1].id} src={ThirdLevel} />
          <StyledMomomizedGroup
            key={letters[0].id}
            onClick={toggleLetter}
            lettersArray={letters}
          />
        </>
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
