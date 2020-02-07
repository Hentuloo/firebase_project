import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Navigation from 'components/Navigation';

const ContentWrapper = styled.div``;

const WithMenuTemplate = ({ children }) => {
  return (
    <>
      <Navigation />
      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
};

WithMenuTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WithMenuTemplate;
