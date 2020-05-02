import React, { FC } from 'react';
import styled from 'styled-components';

import { BarDecorator } from 'components/atoms';
import { useImage } from 'hooks/useImage';
import { useSelector } from 'react-redux';

import defaultPicture from 'assets/svg/icons/defaultProfilePicture.svg';
import { StoreType } from 'store/store';

const Wrapper = styled.div`
  position: relative;
  display: grid;
  width: 65px;
  height: 65px;
  justify-content: center;
  align-content: center;
  ${BarDecorator}
  &::after {
    left: 100%;
    height: 20px;
  }
`;
const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  overflow: hidden;
`;

interface CircleImageProps {
  src: string;
  className?: string;
}

export const CircleImage: FC<CircleImageProps> = ({
  src,
  className = '',
  ...props
}) => {
  const [image] = useImage(src);
  return (
    <Wrapper className={className} {...props}>
      <Image src={image === undefined ? defaultPicture : src} />
    </Wrapper>
  );
};

export const ProfileImage = ({ ...props }) => {
  const { photoURL } = useSelector((store: StoreType) => store.user);

  return <CircleImage src={photoURL || defaultPicture} {...props} />;
};
