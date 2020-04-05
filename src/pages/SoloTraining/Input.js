import React, { useEffect, useRef, useReducer } from 'react';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import styled, { css } from 'styled-components';
import { stickyModal } from 'components/molecules';

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 40px 200px auto;
  font-family: 'PT Mono', monospace;
  font-size: ${({ theme }) => theme.fs.m};
`;
const InnerWrapper = styled.div`
  display: grid;
  grid-template-rows: 40px 40px;
  padding: 30px 20px;

  ${stickyModal}
  position: relative;
`;
const InputWrapper = styled.div`
  ${stickyModal}
  cursor: text;
`;
const InputText = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  text-align: right;
  transform: translate(0%, -50%);
  white-space: pre;
`;
const Input = styled.input`
  text-align: right;
  width: 50%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  color: transparent;
`;
const AvaiableText = styled.div`
  white-space: pre;
  position: relative;
`;
const TextTodo = styled.div`
  white-space: pre;
  position: absolute;
  top: 0%;
  left: 50%;
`;
const TextDone = styled.div`
  white-space: pre;
  position: absolute;
  width: 50%;
  left: 0%;
  top: 0%;
  text-align: right;
  ${({ wrong }) =>
    wrong &&
    css`
      color: red;
    `}
`;
const checkNewInputValue = (correctText, inputValue, newLetter) => {
  const letterInCorrectText = correctText.charAt(
    inputValue.length - 1,
  );

  const isLetterOk = letterInCorrectText === newLetter;
  const isSpace = letterInCorrectText === ' ';

  if (isLetterOk) return [letterInCorrectText, ' '];
  return [' ', isSpace ? '_' : letterInCorrectText];
};

const addLetterToLastItem = (array, letter) => {
  if (array.length === 0) return [letter];
  if (letter === ' ') return [...array, [' ']];
  return [...array.slice(0, -1), array.slice(-1)[0] + letter];
};

const removeLeterFromLastItem = array => {
  if (array.length === 0) return [];

  const lastItem = array.slice(-1)[0];
  if (lastItem === ' ' || lastItem === [' '])
    return [...array.slice(0, -1)];
  if (lastItem === '') {
    if (array.length === 2) return [array[0].slice(0, -1)];
    return [...array.slice(0, -2), array.slice(-2, -1).slice(0, -1)];
  }
  return [...array.slice(0, -1), array.slice(-1)[0].slice(0, -1)];
};

const reducer = (state, action) => {
  if (action.type === 'INPUT_NEW_LETTER') {
    const { inputValue, letter: newLetter } = action.payload;

    const [newGoodChar, newWrongChar] = checkNewInputValue(
      state.text,
      inputValue,
      newLetter,
    );
    const inputValueArray = addLetterToLastItem(
      state.inputValueArray,
      newLetter,
    );

    return {
      ...state,
      inputValue,
      inputValueArray,
      wrongText: state.wrongText + newWrongChar,
      goodText: state.goodText + newGoodChar,
    };
  }

  if (action.type === 'INPUT_BACKSPACE') {
    return {
      ...state,
      inputValueArray: removeLeterFromLastItem(state.inputValueArray),
      inputValue: state.inputValue.slice(0, -1),
      wrongText: state.wrongText.slice(0, -1),
      goodText: state.goodText.slice(0, -1),
    };
  }
  return state;
};

const SpecialInput = () => {
  const ref = useRef(null);
  const [
    { text, inputValueArray, inputValue, wrongText, goodText },
    dispatch,
  ] = useReducer(reducer, {
    inputValue: '',
    inputValueArray: [],
    goodText: '',
    wrongText: '',
    cursor: 0,
    text: 'siema tu xayo 123',
  });

  useEffect(() => {
    const change$ = fromEvent(ref.current, 'input').pipe(
      map(({ data, target }) => ({
        letter: data,
        inputValue: target.value,
      })),
    );

    const sub = change$
      .pipe(
        map(e => {
          switch (e.letter) {
            case null:
              return { payload: e, type: 'INPUT_BACKSPACE' };
            // case ' ':
            //   return { payload: e, type: 'INPUT_SPACE' };
            default:
              return { payload: e, type: 'INPUT_NEW_LETTER' };
          }
        }),
      )
      .subscribe({
        next: e => dispatch(e),
      });

    return () => {
      sub.unsubscribe();
    };
  }, []);
  const setInputFocus = () => {
    ref.current.focus();
  };

  return (
    <Wrapper>
      <div>Kontrolki</div>
      <InnerWrapper>
        <AvaiableText>
          <TextTodo>{text.slice(inputValue.length)}</TextTodo>
          <TextDone>{goodText}</TextDone>
          <TextDone wrong>{wrongText}</TextDone>
        </AvaiableText>
        <InputWrapper onClick={setInputFocus}>
          <Input ref={ref} type="text" />
          <InputText>
            {inputValueArray.map((v, i) => (
              <span key={i}>{v}</span>
            ))}
          </InputText>
        </InputWrapper>
      </InnerWrapper>
    </Wrapper>
  );
};

export default SpecialInput;
