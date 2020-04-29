import React, { useEffect, useRef, forwardRef } from 'react';
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
  font-weight: ${({ theme }) => theme.fw[1]};
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

interface InputComponentProps {
  ArrayedSourceText: string[];
  inputValue: string;
  inputWordsInArray: string[];
  letterWasAdded: boolean;
}

const InputComponent = forwardRef<
  HTMLInputElement,
  InputComponentProps
>(
  (
    {
      ArrayedSourceText,
      inputValue,
      inputWordsInArray,
      letterWasAdded,
    },
    ref,
  ) => {
    const inputTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const input = inputTextRef.current;
      if (!input) return;
      // animations: disappearing word and flying point
      if (
        inputWordsInArray.length < 2 ||
        (inputWordsInArray.length === 2 && letterWasAdded !== false)
      ) {
        return;
      }

      const [textEl, pointEl] = [...input.children].reverse()[
        letterWasAdded ? 2 : 1
      ].children;

      const tl = gsap.timeline();
      if (letterWasAdded) {
        tl.addLabel('start')
          .add(hideTextAnim(textEl), 'start')
          .add(newPointAnim(pointEl), '-=0.3');
      } else {
        tl.add(resetTextAnim(textEl)).add(resetPointAnim(pointEl));
      }
    }, [inputWordsInArray.length, letterWasAdded]);

    const setInputFocus = () => {
      // @ts-ignore
      ref.current.focus();
    };

    return (
      <InputWrapper onClick={setInputFocus}>
        <Input
          ref={ref}
          value={inputValue}
          onChange={e => e.preventDefault()}
          type="text"
          // @ts-ignore
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

export default InputComponent;
