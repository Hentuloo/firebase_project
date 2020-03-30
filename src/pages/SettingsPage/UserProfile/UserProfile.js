import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { logout } from 'fb/controllers/auth';

import {
  ClearButton,
  ButtonEdit,
  ProfileImage,
} from 'components/atoms';
import { stickyWrapper } from 'components/molecules';

import EditProfileModal from './EditProfileModal/EditProfileModal';

const Wrapper = styled.div`
  ${stickyWrapper}
  display: grid;
  width: 94%;
  max-width: 450px;
  grid-template-columns: 60px 1fr 60px;
  grid-template-rows: 30px 30px;
  grid-row-gap: 10px;
  grid-column-gap: 7px;
  margin: 13px auto;
  padding: 17px 30px;
  ${({ theme }) => theme.mediaQuery.vlg} {
    max-width: 500px;
    grid-row-gap: 20px;
  }
`;
const DisplayName = styled.h2`
  grid-column: 2/3;
  grid-row: 1/3;
  text-align: center;
`;
const StyledProfileImage = styled(ProfileImage)`
  grid-column: 1/2;
  grid-row: 1/3;
`;

const ButtonsWrapper = styled.div`
  ${stickyWrapper}
  min-height: 35px;
  grid-auto-flow: column;
  display: grid;
  grid-column: 1/-1;
  justify-content: space-around;
  align-content: center;
  margin-top: 20px;
`;
const Button = styled(ClearButton)`
  font-size: ${({ theme }) => theme.fs.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.color.brand[3]};
  text-align: left;
`;
const StyledButtonEdit = styled(ButtonEdit)`
  grid-column: 3/4;
  grid-row: 1/2;
`;

const UserProfile = ({ className }) => {
  const [openSettingModal, setOpenSettingModal] = useState(false);
  const { displayName } = useSelector(state => state.user);

  const handleLogout = e => {
    e.preventDefault();
    logout();
  };

  const handleDeleteAccount = e => {
    e.preventDefault();
    // logout();
  };

  const toggleModalOpen = () => {
    setOpenSettingModal(!openSettingModal);
  };

  return (
    <Wrapper className={className}>
      <DisplayName>{displayName}</DisplayName>
      <StyledProfileImage />
      <ButtonsWrapper>
        <Button onClick={handleDeleteAccount}>Usuń konto</Button>
        <Button onClick={handleLogout}>Wyloguj się</Button>
      </ButtonsWrapper>
      <StyledButtonEdit
        title="Edytuj profil"
        onClick={toggleModalOpen}
      />
      <EditProfileModal
        isActive={openSettingModal}
        toggleActive={toggleModalOpen}
      />
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
