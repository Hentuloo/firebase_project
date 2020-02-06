import React, { useState } from 'react';
import {
  loginWithEmail,
  createAccountWithEmail,
  loginWithGoogle,
} from 'fb/auth';
import Form from './Form';

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
      if (err.code === 'auth/popup-closed-by-user')
        return setAuthRequest(false);
      setErrorMessage(err.message);
    }
    return null;
  };

  const handleLoginWithGoogle = async e => {
    e.preventDefault();
    setAuthRequest(true);
    await loginWithGoogle();
    setAuthRequest(false);
  };

  return (
    <>
      {authRequest && 'jest teraz logowanie'}
      <h3>{hasAccount ? 'Logowanie' : 'Rejestracja'}</h3>
      <Form
        onSubmit={onSubmit}
        authRequest={authRequest}
        setAuthRequest={setAuthRequest}
        setHasAccount={setHasAccount}
        hasAccount={hasAccount}
        loginWithGoogle={handleLoginWithGoogle}
      />
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
};

export default LoginPage;
