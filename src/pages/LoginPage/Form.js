import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  BarDecorator,
  Input,
  FilledButton,
  ButtonWithBar,
} from 'components/atoms';
import { Card } from 'components/molecules';
import leavesSVG from 'assets/svg/leaves.svg';
import googleIconSVG from 'assets/svg/googleIcon.svg';

const Label = styled.label``;
const Wrapper = styled(Card)`
  display: grid;
  width: 94%;
  max-width: 300px;
  grid-row-gap: 20px;
  margin: 70px auto 0px;
  padding: 10px 0px 30px;
  text-align: center;
  ${({ theme }) => theme.mediaQuery.md} {
      max-width: 350px;
    margin: 70px 140px 0px;
    &::before{
      width:60%;
    }
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    max-width: 450px;
     margin: 120px 200px 0px;
  }

  ${Label}:nth-of-type(1) ${Input} {
    width: 96%;
  }
  ${Label}:nth-of-type(2) ${Input} {
    width: 85%;
  }
  ${FilledButton}:nth-of-type(1) {
    width: 65%;
    ${({ theme }) => theme.mediaQuery.md} {
      width: 55%;
    }
  }
  ${FilledButton}:nth-of-type(2) {
    width: 50%;
     ${({ theme }) => theme.mediaQuery.md} {
      width: 40%;
    }
  }
`;
const Title = styled.h2`
  font-weight: 600;
  margin: 5px 0px 12px;
  ${BarDecorator}
  &::after {
    width: 10%;
    transform: translate(35%, 0%);
  }
`;
const StyledButtonWithBar = styled(ButtonWithBar)`
  display: block;
  width: 100%;
  margin: 15px auto;
  font-weight: 300;
  max-width: 300px;
  ${({ theme }) => theme.mediaQuery.md} {
    max-width: 350px;
    margin: 15px 140px;
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    max-width: 450px;
    margin: 15px 200px;
  }

  &::after {
    width: 70px;
    transform: translate(-120%, 0%);
  }
`;
const GoogleButton = styled(FilledButton)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeavesImage = styled.img`
  display: none;
  ${({ theme }) => theme.mediaQuery.md} {
    display: block;
    width: 180%;
    position: absolute;
    transform: translate(-25%, -10%) rotate(90deg);
    z-index: -5;
    opacity: 0.3;
  }
`;
const GoogleIcon = styled.img`
  width: 26px;
  margin-left: 8px;
`;

const Form = ({
  onSubmit,
  hasAccount,
  setHasAccount,
  loginWithGoogle,
  authRequest,
}) => {
  const [inputValues, setInputValues] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      displayName: '',
      email: '',
      password: '',
    },
  );

  const handleSubmitForm = async e => {
    e.preventDefault();
    onSubmit(inputValues);
  };

  const changeInput = e => {
    const { name, value } = e.target;
    setInputValues({ [name]: value });
  };

  return (
    <>
      <Wrapper as="form" onSubmit={handleSubmitForm}>
        <Title>{hasAccount ? 'Logowanie' : 'Nowe konto'}</Title>
        {hasAccount === false && (
          <Label>
            <span className="sr-only">Wyświetlana nazwa</span>
            <Input
              type="text"
              name="displayName"
              value={inputValues.displayName}
              onChange={changeInput}
              placeholder="Wyświetlana nazwa"
            />
          </Label>
        )}
        <Label>
          <span className="sr-only">Podaj email:</span>
          <Input
            type="text"
            name="email"
            value={inputValues.email}
            onChange={changeInput}
            placeholder="Email"
          />
        </Label>
        <Label>
          <span className="sr-only">Podaj hasło:</span>
          <Input
            type="password"
            name="password"
            value={inputValues.password}
            onChange={changeInput}
            placeholder="Password"
          />
        </Label>
        <FilledButton type="submit">
          {hasAccount ? 'Zaloguj się' : 'Zarejestruj się'}
        </FilledButton>
        <GoogleButton type="button" onClick={loginWithGoogle}>
          <span className="sr-only">Zaloguj się z google</span>
          <span>Google</span> <GoogleIcon src={googleIconSVG} />
        </GoogleButton>
        {authRequest === true && <span>Ładuje...</span>}
        <LeavesImage src={leavesSVG} />
      </Wrapper>
      <StyledButtonWithBar
        type="button"
        onClick={() => setHasAccount(!hasAccount)}
      >
        {hasAccount ? 'Nie mam konta' : 'Mam konto!'}
      </StyledButtonWithBar>
    </>
  );
};

Form.propTypes = {
  authRequest: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
    .isRequired,
  onSubmit: PropTypes.func.isRequired,
  hasAccount: PropTypes.bool.isRequired,
  setHasAccount: PropTypes.func.isRequired,
  loginWithGoogle: PropTypes.func.isRequired,
};

export default Form;
