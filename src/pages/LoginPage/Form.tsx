import React, { useReducer, FC } from 'react';
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
import { usePerspectiveAnimation } from 'hooks/usePerspectiveAnimation';

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
  margin: 5px 0px 12px;
  font-weight: ${({ theme }) => theme.fw[1]};
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
  font-weight: ${({ theme }) => theme.fw[0]};
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
    position: fixed;
    display: block;
    width: 850px;
    top: 0px;
    left: 0px;
    transform: translate(-10%, -15%) rotate(90deg);
    z-index: -5;
    opacity: 0.3;
  }
`;
const GoogleIcon = styled.img`
  width: 26px;
  margin-left: 8px;
`;
interface FormProps {
  onSubmit: (props: any) => any;
  hasAccount: boolean | string;
  setHasAccount: (flag: boolean) => any;
  loginWithGoogle: (props: any) => any;
  authRequest: boolean | string;
}

interface InputValuesReducerState {
  displayName: string;
  email: string;
  password: string;
}
interface InputValuesReducerNewState {
  displayName?: string;
  email?: string;
  password?: string;
}

const Form: FC<FormProps> = ({
  onSubmit,
  hasAccount,
  setHasAccount,
  loginWithGoogle,
  authRequest,
}) => {
  const ref = usePerspectiveAnimation<HTMLFormElement>();

  const [inputValues, setInputValues] = useReducer(
    (
      prevState: InputValuesReducerState,
      newState: InputValuesReducerNewState,
    ) => ({
      ...prevState,
      ...newState,
    }),
    {
      displayName: '',
      email: '',
      password: '',
    },
  );

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    onSubmit(inputValues);
  };

  const changeInput = (e: any) => {
    const { name, value } = e.target;
    setInputValues({ [name]: value });
  };

  return (
    <>
      <Wrapper ref={ref} as="form" onSubmit={handleSubmitForm}>
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
            type="email"
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
          <span>Google</span>
          <GoogleIcon src={googleIconSVG} />
        </GoogleButton>
        {authRequest === true && <span>Ładuje...</span>}
      </Wrapper>
      <LeavesImage src={leavesSVG} />
      <StyledButtonWithBar
        type="button"
        onClick={() => setHasAccount(!hasAccount)}
      >
        {hasAccount ? 'Nie mam konta' : 'Mam konto!'}
      </StyledButtonWithBar>
    </>
  );
};

export default Form;
