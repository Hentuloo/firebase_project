import React, { FC, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import {
  ClearButton,
  ButtonEdit,
  ProfileImage,
} from 'components/atoms';
import { stickyModal } from 'components/molecules';

import { Auth } from 'fb';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Constants } from 'config/Constants';
import { toast } from 'react-toastify';
import { getUser } from 'store/selectors/user.selector';
import EditProfileModal from './EditProfileModal/EditProfileModal';
import DeleteUserModal from './DeleteUserModal';

const Wrapper = styled.div`
  ${stickyModal}
  display: grid;
  width: 94%;
  max-width: 450px;
  grid-template-columns: 60px 1fr 60px;
  grid-template-rows: 30px auto auto;
  grid-row-gap: 10px;
  grid-column-gap: 7px;
  margin: 13px auto;
  padding: 17px 15px;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-template-columns: 60px 1fr 60px;
    grid-template-rows: 30px 30px;
    padding: 17px 30px;
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    max-width: 500px;
    grid-row-gap: 20px;
  }
`;
const DisplayName = styled.h2`
  grid-column: 1/-1;
  grid-row: 3/4;
  text-align: center;
  font-size: ${({ theme }) => theme.fs.s};
  ${({ theme }) => theme.mediaQuery.md} {
    grid-column: 2/3;
    grid-row: 1/3;
  }
`;
const StyledProfileImage = styled(ProfileImage)`
  grid-column: 1/2;
  grid-row: 1/3;
`;

const ButtonsWrapper = styled.div`
  ${stickyModal}
  min-height: 35px;
  grid-auto-flow: column;
  display: grid;
  grid-column: 1/-1;
  justify-content: space-around;
  align-content: center;
  ${({ theme }) => theme.mediaQuery.md} {
    margin-top: 20px;
  }
`;
const Button = styled(ClearButton)`
  font-size: ${({ theme }) => theme.fs.xs};
  font-weight: ${({ theme }) => theme.fw[1]};
  color: ${({ theme }) => theme.color.contrastBrand[0]};
  text-align: center;
`;
const StyledButtonEdit = styled(ButtonEdit)`
  grid-column: 3/4;
  grid-row: 1/2;
`;

interface UserProfileProps {
  className?: string;
}

const UserProfile: FC<UserProfileProps> = ({ className = '' }) => {
  const history = useHistory();
  const [isRequest, setIsRequest] = useState(false);

  const { displayName } = useSelector(getUser);

  const handleLogout = () => {
    Auth.init().logout();
  };

  const handleDeleteAccount = async (password: string) => {
    if (isRequest) return null;
    setIsRequest(true);
    try {
      await Auth.init().deleteUser(password);
    } catch (err) {
      toast.error(Constants.firebaseErrors[err.code] || err.message);
    }
    setIsRequest(false);
  };

  const closeModal = async () => {
    history.goBack();
  };

  return (
    <>
      <Wrapper className={className}>
        <DisplayName>{displayName}</DisplayName>
        <StyledProfileImage />
        <ButtonsWrapper>
          <Button to={Constants.paths.settingsDeleteUser.path}>
            Usuń konto
          </Button>
          <Button onClick={handleLogout}>Wyloguj się</Button>
        </ButtonsWrapper>
        <StyledButtonEdit
          title="Edytuj profil"
          to={Constants.paths.settingsChangeProfile.path}
        />
      </Wrapper>
      <Switch>
        <Route path={Constants.paths.settingsChangeProfile.path}>
          <EditProfileModal toggleActive={closeModal} />
        </Route>
        <Route path={Constants.paths.settingsDeleteUser.path}>
          <DeleteUserModal
            handleSubmit={handleDeleteAccount}
            toggleActive={closeModal}
          />
        </Route>
      </Switch>
    </>
  );
};

UserProfile.propTypes = {
  className: PropTypes.string,
};
UserProfile.defaultProps = {
  className: '',
};

export default UserProfile;
