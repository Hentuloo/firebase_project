import React, { useRef, useEffect, FC } from 'react';
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

import { StoreType } from 'store/store';
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

interface EditProfileModal {
  isActive: boolean;
  toggleActive: () => any;
}

const EditProfileModal: FC<EditProfileModal> = ({
  isActive = false,
  toggleActive,
}) => {
  const imageRef = useRef(null);
  const [progress, updateProgress] = useProgressBar();
  const { displayName, uid } = useSelector(
    (state: StoreType) => state.user,
  );
  const [
    { closeModal, isRequest, errorMessage, inputValue },
    dispatch,
  ] = useThunkReducer(reducer, initState);

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    dispatch({ type: types.SET_INPUT_VALUE, payload: value });
  };

  const handleSubmitChange = async (e: any) => {
    e.preventDefault();
    if (isRequest || !uid) return null;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRequest]);

  return (
    <Wrapper active={isActive} toggleActive={toggleActive}>
      <FormWrapper onSubmit={handleSubmitChange}>
        <LoadingBar
          progress={progress as number}
          role="presentation"
        />
        <Label>
          <span>Zmień swoją nazwę:</span>
          <TextInput
            type="text"
            name="nickName"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={displayName || ''}
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
        {isRequest && <p>Ładowanie {progress} %</p>}
      </FormWrapper>
    </Wrapper>
  );
};

export default EditProfileModal;
