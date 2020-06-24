import React, { FC } from 'react';
import styled from 'styled-components';
import Tippy from '@tippyjs/react';

const Wrapper = styled.div`
  display: grid;
  height: 40px;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const Text = styled.span``;

export interface SmallImageWithTextProps {
  src: string;
  text: string | number;
  labelText?: string;
  alt?: string;
}

export const SmallImageWithText: FC<SmallImageWithTextProps> = ({
  src,
  alt,
  text,
  labelText,
  ...props
}) => {
  return (
    <Tippy
      content={labelText}
      delay={100}
      disabled={labelText === undefined}
    >
      <Wrapper {...props}>
        <ImageWrapper>
          <Image src={src} alt={alt} />
        </ImageWrapper>
        <Text>{text}</Text>
      </Wrapper>
    </Tippy>
  );
};
