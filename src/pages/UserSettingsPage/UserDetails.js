import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { ClearButton } from 'components/atoms';
import { Modal } from 'components/compoud';

const Wrapper = styled.div`
  display: grid;
  width: 400px;
  grid-template-columns: 60px 1fr 60px;
  grid-template-rows: 30px 30px;
  grid-column-gap: 15px;
  margin: 0px auto;
`;
const DisplayName = styled.h2`
  grid-column: 2/3;
`;
const ImageWrapper = styled.div`
  grid-column: 1/2;
  grid-row: 1/3;
`;
const Image = styled.img`
  max-width: 100%;
  border-radius: 50%;
`;

const UserDetails = ({ className }) => {
  const { displayName, photoURL } = useSelector(state => state.user);

  const handleSubmitChange = () => {};

  return (
    <Wrapper className={className}>
      <DisplayName>{displayName}</DisplayName>
      {photoURL && (
        <ImageWrapper>
          <Image
            src={photoURL}
            alt={`avatar użtykownika: ${displayName}`}
          />
        </ImageWrapper>
      )}
      <Modal.Wrapper onSubmit={handleSubmitChange}>
        <Modal.Toggler
          render={toggle => (
            <ClearButton title="Edytuj profil" onClick={toggle}>
              <span className="sr-only">Edytuj profil</span>
              <i className="fa fa-pencil" aria-hidden="true" />
            </ClearButton>
          )}
        />
        <Modal.Content>STH</Modal.Content>
      </Modal.Wrapper>
    </Wrapper>
  );
};

UserDetails.propTypes = {
  className: PropTypes.string,
};
UserDetails.defaultProps = {
  className: '',
};

export default UserDetails;
