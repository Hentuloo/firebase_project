import React, { useState, FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logoSVG from 'assets/svg/icons/logo.svg';
import backgroundImage from 'assets/svg/road/corner1.svg';

import { Constants } from 'config/Constants';
import { GoogleLoading } from 'components/atoms';
import { useRedirect } from 'hooks/useRedirect';
import { Auth } from 'fb';
import Form from './Form';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;
const LogoWrapper = styled.div`
  position: fixed;
  left: 3%;
  top: 0.5%;
  width: 50px;
  margin: 0px auto;
  ${({ theme }) => theme.mediaQuery.md} {
    width: 80px;
    left: auto;
    top: auto;
    bottom: 2%;
    right: 2%;
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    width: 100px;
  }
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
  ${({ theme }) => theme.mediaQuery.md} {
    width: 100vw;
    max-width: 1200px;
    transform: translate(20%, -15%) rotate(-10deg);
    opacity: 1;
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    max-width: 1500px;
    transform: translate(30%, -15%) rotate(0deg);
  }
`;
const StyledAuthLoading = styled(GoogleLoading)`
  position: fixed;
  left: 50%;
  top: 50%;
  width: 100vw;
  transform: translate(-50%, -50%);
  ${({ theme }) => theme.mediaQuery.md} {
    width: auto;
    left: 5%;
    top: 5%;
    transform: translate(0%, 0%);
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    transform: translate(10%, 10%);
  }
`;

const LoginPage: FC = () => {
  const [hasAccount, setHasAccount] = useState<boolean | string>(
    false,
  );
  const [authRequest, setAuthRequest] = useState<boolean | string>(
    false,
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const redirect = useRedirect();
  const onSubmit = async ({
    email,
    password,
    displayName,
  }: {
    email: string;
    password: string;
    displayName: string;
  }) => {
    setErrorMessage(null);
    const { loginWithEmail, createAccountWithEmail } = Auth.init();
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
        redirect(Constants.paths.registered.path);
        // setAuthRequest(false);
      }
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') return;
      setAuthRequest(false);
      setErrorMessage(err.message);
    }
  };

  const handleLoginWithGoogle = async (e: any) => {
    e.preventDefault();
    try {
      setAuthRequest('google');
      await Auth.init().loginWithGoogle();
      if (!hasAccount)
        return redirect(Constants.paths.registered.path);
      setAuthRequest(false);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <Wrapper>
      <StyledAuthLoading
        active={authRequest === 'google' && !errorMessage}
      />
      <Link to={Constants.paths.root.path}>
        <span className="sr-only">Przejdź do strony głównej</span>
        <LogoWrapper>
          <LogoImage src={logoSVG} />
        </LogoWrapper>
      </Link>
      {authRequest !== 'google' && (
        <Form
          onSubmit={onSubmit}
          authRequest={authRequest}
          setHasAccount={setHasAccount}
          hasAccount={hasAccount}
          loginWithGoogle={handleLoginWithGoogle}
        />
      )}
      {errorMessage && <p>{errorMessage}</p>}
      <BackGroundImage src={backgroundImage} />
    </Wrapper>
  );
};

export default LoginPage;
