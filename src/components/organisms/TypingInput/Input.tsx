import React, {
  useEffect,
  useRef,
  forwardRef,
  useCallback,
} from 'react';
import styled from 'styled-components';
import { stickyModal } from 'components/molecules';

import gsap from 'gsap';
import { TypingStatus } from 'hooks/useInputSpeedTest/types';
import { MemomizedWrittenWord } from './WrittenWord';

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

interface InputCmpProps {
  sourceTextInArray: string[];
  inputValue: string;
  inputWordsInArray: string[];
  letterWasAdded: boolean;
  gameStatus: TypingStatus;
}

const InputCmp = forwardRef<HTMLInputElement, InputCmpProps>(
  (props, ref) => {
    const {
      sourceTextInArray,
      inputValue,
      inputWordsInArray,
      letterWasAdded,
      gameStatus,
    } = props;
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

    const setInputFocus = useCallback(() => {
      // @ts-ignore
      ref.current.focus();
    }, [ref]);

    useEffect(() => {
      if (gameStatus === TypingStatus.TYPING) setInputFocus();
    }, [gameStatus, setInputFocus]);

    return (
      <InputWrapper onClick={setInputFocus}>
        <Input
          ref={ref}
          value={inputValue}
          onChange={e => e.preventDefault()}
          type="text"
          // @ts-ignore
          spellcheck="false"
          autoComplete="false"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <InputText ref={inputTextRef}>
          {inputWordsInArray.map((word, i) => (
            <MemomizedWrittenWord
              key={i}
              activeWord={word}
              wordInSourceText={
                sourceTextInArray[inputWordsInArray.length - 1]
              }
            />
          ))}
        </InputText>
      </InputWrapper>
    );
  },
);

export default InputCmp;
