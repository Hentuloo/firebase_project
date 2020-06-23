import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import podiumSvg from 'assets/svg/ilustrations/podium.svg';
import defaultPicture from 'assets/svg/icons/defaultProfilePicture.svg';

const Wrapper = styled.div`
  position: relative;
  width: 90%;
  max-width: 500px;
`;
const BackgroundImage = styled.img`
  position: relative;
  display: block;
  width: 100%;
`;

const CircleImage = styled.img`
  position: absolute;
  width: 26%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 5px solid ${({ theme }) => theme.color.brand[4]};
`;
const CirclesWrapper = styled.div`
  ${CircleImage}:nth-of-type(1) {
    transform: translate(-50%, -60%);
    z-index: 5;
  }
  ${CircleImage}:nth-of-type(2) {
    transform: translate(-130%, -15%);
  }
  ${CircleImage}:nth-of-type(3) {
    transform: translate(30%, -15%);
  }
`;
export interface ImageObject {
  src: string;
  alt: string;
}

export interface PodiumWithImagesProps {
  images: ImageObject[];
}

export const PodiumWithImages: FC<PodiumWithImagesProps> = ({
  images,
  ...props
}) => {
  const prearedImages = useMemo(() => {
    return [0, 1, 2].map(i => {
      if (images[i]) {
        return (
          <CircleImage
            key={i}
            src={images[i].src || defaultPicture}
            alt={images[i].src || 'Użytkownik'}
          />
        );
      }
      return <CircleImage key={i} src={defaultPicture} />;
    });
  }, [images]);

  return (
    <Wrapper {...props}>
      <BackgroundImage src={podiumSvg} title="Podium tło" />
      <CirclesWrapper>{prearedImages}</CirclesWrapper>
    </Wrapper>
  );
};
