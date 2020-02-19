import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { logout } from 'fb/controllers/auth';

import { ClearButton } from 'components/atoms';

import UserProfileSettings from './UserProfileSettings';

const Wrapper = styled.div`
  display: grid;
  width: 94%;
  max-width: 400px;
  grid-template-columns: 60px 1fr 60px;
  grid-template-rows: 30px 30px;
  grid-column-gap: 15px;
  grid-row-gap: 5px;
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
const Button = styled(ClearButton)`
  grid-column: 1/-1;
  font-size: ${({ theme }) => theme.fs.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.color.brand[3]};
  text-align: left;
`;

const UserProfile = ({ className }) => {
  const { displayName, photoURL } = useSelector(state => state.user);

  const handleLogout = e => {
    e.preventDefault();
    logout();
  };

  const handleDeleteAccount = e => {
    e.preventDefault();
    // logout();
  };

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
      <UserProfileSettings />
      <Button onClick={handleDeleteAccount}>Usuń konto</Button>
      <Button onClick={handleLogout}>Wyloguj się</Button>
    </Wrapper>
  );
};

UserProfile.propTypes = {
  className: PropTypes.string,
};
UserProfile.defaultProps = {
  className: '',
};

export default UserProfile;
