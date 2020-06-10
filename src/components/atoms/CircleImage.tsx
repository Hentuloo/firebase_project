import React, { FC } from 'react';
import styled from 'styled-components';
import { BarDecorator } from 'components/atoms';
import { useSelector } from 'react-redux';

import defaultPicture from 'assets/svg/icons/defaultProfilePicture.svg';
import { getUser } from 'store/selectors/user.selector';

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
  src = defaultPicture,
  className = '',
  ...props
}) => {
  return (
    <Wrapper className={className} {...props}>
      <Image
        src={src === null ? defaultPicture : src}
        alt="ikona użytkownika"
      />
    </Wrapper>
  );
};

export const ProfileImage = ({ ...props }) => {
  const { photoURL } = useSelector(getUser);

  return <CircleImage src={photoURL || defaultPicture} {...props} />;
};
