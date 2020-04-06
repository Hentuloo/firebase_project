import React, { useEffect, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { stickyModal } from 'components/molecules';

import gsap from 'gsap';
import { MemomizedInputText } from './InputText';

import {
  resetTextAnim,
  hideTextAnim,
  resetPointAnim,
  newPointAnim,
} from './animations';

const InputWrapper = styled.div`
  ${stickyModal}
  cursor: text;
`;
const Input = styled.input`
  text-align: right;
  width: 50%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 1em;
  font-weight: 600;
  color: transparent;
  background-color: transparent;
  caret-color: ${({ theme }) => theme.color.black[0]};
  pointer-events: none;
`;

const InputText = styled.div`
  position: absolute;
  display: grid;
  top: 50%;
  right: 50%;
  grid-auto-flow: column;

  transform: translate(0%, -50%);
  white-space: pre;
`;

const InputComponent = forwardRef(
  (
    {
      ArrayedSourceText,
      inputValue,
      inputWordsInArray,
      letterWasAdded,
    },
    ref,
  ) => {
    const inputTextRef = useRef(null);

    useEffect(() => {
      // animations: disappearing word and flying point
      if (
        inputWordsInArray.length < 2 ||
        (inputWordsInArray.length === 2 && letterWasAdded !== false)
      ) {
        return;
      }

      const [textEl, pointEl] = [
        ...inputTextRef.current.children,
      ].reverse()[letterWasAdded ? 2 : 1].children;

      const tl = gsap.timeline();
      if (letterWasAdded) {
        tl.addLabel('start')
          .add(hideTextAnim(textEl), 'start')
          .add(newPointAnim(pointEl), '-=0.3');
      } else {
        tl.add(resetTextAnim(textEl)).add(resetPointAnim(pointEl));
      }
    }, [inputWordsInArray.length]);

    const setInputFocus = () => {
      ref.current.focus();
    };

    return (
      <InputWrapper onClick={setInputFocus}>
        <Input
          ref={ref}
          value={inputValue}
          type="text"
          spellcheck="false"
        />
        <InputText ref={inputTextRef}>
          {inputWordsInArray.map((word, i) => (
            <MemomizedInputText
              key={i}
              activeWord={word}
              wordInSourceText={
                ArrayedSourceText[inputWordsInArray.length - 1]
              }
            />
          ))}
        </InputText>
      </InputWrapper>
    );
  },
);

InputComponent.propTypes = {
  inputValue: PropTypes.string.isRequired,
  ArrayedSourceText: PropTypes.arrayOf(PropTypes.string).isRequired,
  inputWordsInArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  letterWasAdded: PropTypes.bool.isRequired,
};

export default InputComponent;
