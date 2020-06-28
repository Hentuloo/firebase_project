import React, { Fragment } from 'react';
import { chunkArray } from 'utils';
import firstLevel from 'assets/svg/levels/level1.svg';
import secondLevel from 'assets/svg/levels/level2.svg';
import ThirdLevel from 'assets/svg/levels/level3.svg';
import { LettersButtons } from './LettersButtons';
import { ToggleLetter, LetterWithStatusFlags } from './types';
import { LevelImageWithTippy } from './LevelImageWithTippy';

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
          <LevelImageWithTippy
            src={firstLevel}
            tippyContent={
              <>
                <span>Pierwszy poziom!</span>{' '}
                <span>Minimalna prędkość: 30wpm</span>{' '}
                <span>Minimalna celność: 85%</span>
              </>
            }
          />
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
          <LevelImageWithTippy
            src={secondLevel}
            tippyContent={
              <>
                <span>Drugi poziom!</span>{' '}
                <span>Minimalna prędkość: 40wpm</span>{' '}
                <span>Minimalna celność: 92%</span>
              </>
            }
          />
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
          <LevelImageWithTippy
            src={ThirdLevel}
            tippyContent={
              <>
                <span>Trzeci poziom</span>{' '}
                <span>Minimalna prędkość: 45wpm</span>{' '}
                <span>Minimalna celność: 95%</span>
              </>
            }
          />
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
