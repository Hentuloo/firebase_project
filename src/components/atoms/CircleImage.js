import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BarDecorator } from 'components/atoms';
import { useImage } from 'hooks/useImage';

import defaultPicture from 'assets/svg/defaultProfilePicture.svg';

const Wrapper = styled.div`
  width: 65px;
  height: 65px;
  ${BarDecorator}
  &::after {
    left: 100%;
    height: 20px;
  }
`;
const Image = styled.img`
  max-width: 100%;
  border-radius: 50%;
  overflow: hidden;
`;

export const CircleImage = ({ src, className }) => {
  const [image] = useImage(src);
  return (
    <Wrapper className={className}>
      <Image src={image === undefined ? defaultPicture : src} />
    </Wrapper>
  );
};
CircleImage.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
};
CircleImage.defaultProps = {
  className: '',
};
