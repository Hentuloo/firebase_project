import React, { useState } from 'react';
import styled from 'styled-components';
import {
  loginWithEmail,
  createAccountWithEmail,
  loginWithGoogle,
} from 'fb/controllers/auth';

import logoSVG from 'assets/svg/logo.svg';
import backgroundImage from 'assets/svg/road/corner1.svg';

import Form from './Form';

const LogoWrapper = styled.div`
  position: fixed;
  left: 3%;
  top: 0.5%;
  width: 50px;
  margin: 0px auto;
`;
const LogoImage = styled.img`
  max-width: 100%;
`;
const BackGroundImage = styled.img`
  position: fixed;
  right: 0%;
  top: 0%;
  width: 250vw;
  transform: translate(44%, -25%) rotate(-25deg);
  z-index: -5;
  opacity: 0.2;
`;

const LoginPage = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const [authRequest, setAuthRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async ({ email, password, displayName }) => {
    setErrorMessage(null);
    try {
      if (hasAccount) {
        setAuthRequest(true);
        await loginWithEmail(email, password);
        setAuthRequest(false);
      } else {
        setAuthRequest(true);
        await createAccountWithEmail(
          { email, password },
          { displayName },
        );
        setAuthRequest(false);
      }
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') return;
      setAuthRequest(false);
      setErrorMessage(err.message);
    }
  };

  const handleLoginWithGoogle = async e => {
    e.preventDefault();
    try {
      setAuthRequest(true);
      await loginWithGoogle();
      setAuthRequest(false);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <>
      {authRequest && 'jest teraz logowanie'}
      <LogoWrapper>
        <LogoImage src={logoSVG} />
      </LogoWrapper>
      <Form
        onSubmit={onSubmit}
        authRequest={authRequest}
        setAuthRequest={setAuthRequest}
        setHasAccount={setHasAccount}
        hasAccount={hasAccount}
        loginWithGoogle={handleLoginWithGoogle}
      />
      {errorMessage && <p>{errorMessage}</p>}
      <BackGroundImage src={backgroundImage} />
    </>
  );
};

export default LoginPage;
