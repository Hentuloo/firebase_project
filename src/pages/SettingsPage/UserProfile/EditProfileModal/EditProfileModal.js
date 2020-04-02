import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import {
  TextInput,
  LoadingBar,
  ClearButton,
  FilledButton,
} from 'components/atoms';
import { Modal } from 'components/molecules';

import { useProgressBar } from 'hooks/useProgressBar';
import { useThunkReducer } from 'hooks/useThunkReducer';

import { reducer } from './reducer';
import { types } from './types';
import { submitForm } from './actions';

const Wrapper = styled(Modal)``;
const FormWrapper = styled.form`
  display: grid;
  min-height: 250px;
  grid-row-gap: 7px;
  justify-content: space-around;
  padding: 30px 30px 10px;
`;
const SendFileButton = styled(FilledButton)`
  font-size: ${({ theme }) => theme.fs.xxs};
  max-width: 60vw;
`;
const Label = styled.label`
  display: grid;

  grid-column-gap: 7px;
  align-items: center;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-auto-flow: column;
  }
`;

const initState = {
  isRequest: false,
  errorMessage: null,
  inputValue: '',
  closeModal: false,
};

const EditProfileModal = ({ isActive, toggleActive }) => {
  const imageRef = useRef(null);
  const [progress, updateProgress] = useProgressBar();
  const { displayName, uid } = useSelector(state => state.user);
  const [
    { closeModal, isRequest, errorMessage, inputValue },
    dispatch,
  ] = useThunkReducer(reducer, initState);

  const handleInputChange = e => {
    const { value } = e.target;
    dispatch({ type: types.SET_INPUT_VALUE, payload: value });
  };

  const handleSubmitChange = async e => {
    e.preventDefault();
    if (isRequest) return null;
    dispatch(
      submitForm({
        imageRef,
        inputValue,
        uid,
        updateProgress,
      }),
    );
  };
  useEffect(() => {
    if (closeModal) toggleActive();
  }, [isRequest]);

  return (
    <Wrapper active={isActive} toggleActive={toggleActive}>
      <FormWrapper onSubmit={handleSubmitChange}>
        <LoadingBar progress={progress} role="presentation" />
        <Label>
          <span>Zmień swoją nazwę:</span>
          <TextInput
            type="text"
            name="nickName"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={displayName}
          />
        </Label>
        <Label>
          <span>Prześlij inny avatar:</span>
          <SendFileButton
            as="input"
            ref={imageRef}
            type="file"
            name="avatarPhoto"
          />
        </Label>
        <ClearButton type="submit">Wyślij</ClearButton>
        {errorMessage && <p>{errorMessage}</p>}
        {isRequest && <p>Ładowanie {progress}%</p>}
      </FormWrapper>
    </Wrapper>
  );
};

EditProfileModal.propTypes = {
  toggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
};
EditProfileModal.defaultProps = {
  isActive: false,
};

export default EditProfileModal;
