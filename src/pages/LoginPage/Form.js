import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.form`
  display: grid;
  width: 400px;
`;

const Form = ({
  onSubmit,
  hasAccount,
  setHasAccount,
  loginWithGoogle,
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
    <Wrapper onSubmit={handleSubmitForm}>
      {hasAccount === false && (
        <label>
          Wyświetlana nazwa
          <input
            type="text"
            name="displayName"
            value={inputValues.displayName}
            onChange={changeInput}
          />
        </label>
      )}
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={inputValues.email}
          onChange={changeInput}
        />
      </label>
      <label>
        Password:
        <input
          type="text"
          name="password"
          value={inputValues.password}
          onChange={changeInput}
        />
      </label>

      <button type="submit">
        {hasAccount ? 'Zaloguj się' : 'Zarejestruj się'}
      </button>
      <button type="button" onClick={loginWithGoogle}>
        Zaloguj się z google
      </button>
      <button
        type="button"
        onClick={() => setHasAccount(!hasAccount)}
      >
        {hasAccount ? 'Nie mam konta' : 'Mam konto!'}
      </button>
    </Wrapper>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  hasAccount: PropTypes.bool.isRequired,
  setHasAccount: PropTypes.func.isRequired,
  loginWithGoogle: PropTypes.func.isRequired,
};

export default Form;
