import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import googleIconSVG from 'assets/svg/googleIconGreen.svg';

const Wrapper = styled.div`
  text-align: center;
`;
const Image = styled.img``;

export const GoogleLoading = ({ active, className }) => {
  if (!active) return null;
  return (
    <Wrapper className={className}>
      <Image src={googleIconSVG} />
    </Wrapper>
  );
};

GoogleLoading.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
};
GoogleLoading.defaultProps = {
  className: '',
  active: false,
};
