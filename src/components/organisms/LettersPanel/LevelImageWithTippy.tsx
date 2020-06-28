import React, { FC } from 'react';
import styled from 'styled-components';
import Tippy from '@tippyjs/react';

const ImageWrapper = styled.div`
  text-align: center;
`;
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
const TippyLevelWrapper = styled.div`
  display: grid;
  text-align: center;
`;
type Content = React.ReactChild | React.ReactChild[];

export interface LevelImageWithTippyProps {
  src: string;
  tippyContent: Content;
}

export const LevelImageWithTippy: FC<LevelImageWithTippyProps> = ({
  tippyContent,
  src,
  ...props
}) => {
  return (
    <Tippy
      {...props}
      content={<TippyLevelWrapper>{tippyContent}</TippyLevelWrapper>}
      placement="left"
      popperOptions={{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -30],
            },
          },
        ],
      }}
    >
      <ImageWrapper>
        <Image src={src} />
      </ImageWrapper>
    </Tippy>
  );
};
