import React, { useState, FC, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logoSVG from 'assets/svg/icons/logo.svg';
import { Constants } from 'config/Constants';
import { GoogleLoading } from 'components/atoms';
import { useRedirect } from 'hooks/useRedirect';
import { Auth } from 'fb';
import { toast } from 'react-toastify';
import { WithBackgroundTemplate } from 'templates/WithBackgroundTemplate';
import { useSelector } from 'react-redux';
import { getUser } from 'store/selectors/user.selector';
import { setTimeout } from 'timers';
import Form, { InputValuesReducerState } from './Form';

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
  const { uid } = useSelector(getUser);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [hasAccount, setHasAccount] = useState<boolean | string>(
    false,
  );
  const [authRequest, setAuthRequest] = useState<boolean | string>(
    false,
  );
  const redirect = useRedirect();
  const onSubmit = async ({
    email,
    password,
    displayName,
  }: InputValuesReducerState) => {
    const { loginWithEmail, createAccountWithEmail } = Auth.init();
    try {
      setAuthRequest(true);
      if (hasAccount) {
        await loginWithEmail(email, password);
        setAuthRequest(false);
        redirect(Constants.paths.dashboard.path);
        return;
      }
      await createAccountWithEmail({ email, password, displayName });
    } catch (err) {
      toast.error(Constants.firebaseErrors[err.code] || err.message);
      if (err.code === 'auth/popup-closed-by-user') return;
      setAuthRequest(false);
    }
  };

  const handleLoginWithGoogle = async (e: any) => {
    e.preventDefault();

    try {
      setAuthRequest('google');
      await Auth.init().loginWithGoogle();
      const id = setTimeout(() => setAuthRequest(false), 1000);
      setTimeoutId(id);
    } catch (err) {
      toast.error(Constants.firebaseErrors[err.code] || err.message);
      setAuthRequest(false);
    }
  };

  useEffect(() => {
    if (uid !== null) {
      if (!timeoutId) return;
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  }, [hasAccount, redirect, timeoutId, uid]);

  useEffect(() => {
    if (uid !== null && timeoutId === null) {
      if (!hasAccount)
        return redirect(Constants.paths.registered.path);
      return redirect(Constants.paths.dashboard.path);
    }
  }, [hasAccount, redirect, timeoutId, uid]);

  return (
    <WithBackgroundTemplate type={0}>
      <StyledAuthLoading active={authRequest === 'google'} />
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
    </WithBackgroundTemplate>
  );
};

export default LoginPage;
