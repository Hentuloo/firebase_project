import React, {
  FC,
  useMemo,
  useEffect,
  useRef,
  HTMLAttributes,
} from 'react';
import styled, { css } from 'styled-components';
import {
  checkIfNumberIsInComprtment,
  getNumbersFromCompartment,
} from 'utils';
import Tippy from '@tippyjs/react';
import gsap, { Draggable } from 'gsap/all';

const circleSize = 50;
const size = css`
  height: ${circleSize}px;
  width: ${circleSize}px;
`;
const Wrapper = styled.div`
  ${size};
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.color.shadow[0]};
  overflow: hidden;
  font-size: ${({ theme }) => theme.fs.m};
  font-weight: ${({ theme }) => theme.fw[1]};
  color: ${({ theme }) => theme.color.brand[2]};

  ${({ theme }) => theme.mediaQuery.lg} {
    font-size: ${({ theme }) => theme.fs.s};
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    font-size: ${({ theme }) => theme.fs.xs};
  }
`;
const NumbersWrapper = styled.div`
  margin-top: ${circleSize / 4}px;
`;
const NumberElement = styled.span<{ off?: boolean }>`
  display: block;
  ${size};
  height: ${circleSize / 2}px;
  line-height: ${circleSize / 2}px;
  text-align: center;
  ${({ off }) =>
    off &&
    css`
      cursor: initial !important;
      pointer-events: none;
      filter: grayscale(100%);
    `}
`;

export type InputNumberProps = Modify<
  HTMLAttributes<HTMLDivElement>,
  {
    onChange: (number: number) => any;
    value: number;
    insertBefore?: number[];
    insertAfter?: number[];
    max?: number;
    min?: number;
    disable?: boolean;
  }
>;

export const InputNumber: FC<InputNumberProps> = ({
  onChange,
  value,
  insertBefore,
  insertAfter,
  max = 10,
  min = 1,
  disable = false,
  title,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const numbers = useMemo(
    () =>
      getNumbersFromCompartment(min, max, insertBefore, insertAfter),
    [max, min, insertBefore, insertAfter],
  );

  const handleChangeNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = Number(e.target.value);
    if (!checkIfNumberIsInComprtment(newValue, min, max)) return;
    onChange(newValue);
  };

  useEffect(() => {
    const wrapper = ref.current;
    if (!wrapper) return;

    const childHeight = wrapper.children[0].clientHeight;

    gsap.to(wrapper, {
      duration: 0.5,
      y: -value * childHeight,
    });
  }, [value]);

  useEffect(() => {
    // set draggable listener
    const wrapper = ref.current;
    if (!wrapper || disable) return;
    const childHeight = wrapper.children[0].clientHeight;

    const sub = Draggable.create(wrapper, {
      type: 'y',
      inertia: true,
      bounds: {
        minX: 0,
        minY: -wrapper.clientHeight + childHeight,
        maxX: 0,
        maxY: 0,
      },
      onDragStart() {
        gsap.set('body', { cursor: 'grabbing' });
      },
      onDragEnd() {
        const indexOfNumber = Math.round(this.y / childHeight);
        const number = numbers[Math.abs(indexOfNumber)];
        onChange(number);
        gsap.set('body', { cursor: 'auto' });
      },
    });

    return () => {
      sub[0].kill();
    };
  }, [numbers, onChange, disable]);

  return (
    <Tippy content={title} delay={300} disabled={title === undefined}>
      <Wrapper {...props}>
        {title && <span className="sr-only">{title}</span>}
        <input
          className="sr-only"
          type="number"
          onChange={handleChangeNumber}
          value={value}
          min={min}
          max={max}
        />

        <NumbersWrapper ref={ref}>
          {numbers.map(number => (
            <NumberElement key={number} off={disable}>
              {number}
            </NumberElement>
          ))}
        </NumbersWrapper>
      </Wrapper>
    </Tippy>
  );
};
