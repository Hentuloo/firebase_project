import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { uploadFilePromise, userPhotoRef } from 'fb/storage';
import { updateUserDoc } from 'fb/controllers/userProfile';

import { ClearButton, TextInput, LoadingBar } from 'components/atoms';
import { Modal } from 'components/compoud';
import { validImageFile } from 'config/utils';

const StyledModalContent = styled.div`
  display: grid;
  grid-row-gap: 7px;
`;
const Label = styled.label`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 7px;
  align-items: center;
`;

const UserUpdateSettings = () => {
  const [isRequest, setIsRequest] = useState(false);
  const [requestProgress, setRequestProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const imageRef = useRef(null);

  const { displayName, uid } = useSelector(state => state.user);

  const handleInputChange = e => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleSubmitChange = async () => {
    if (isRequest) return null;
    setErrorMessage(null);
    const nweFields = {};
    const firstImage = imageRef.current.files[0];

    try {
      setIsRequest(true);
      setRequestProgress(0);
      if (firstImage) {
        // valid file
        const { ok, message } = validImageFile(firstImage);
        if (!ok) throw new Error(message);

        // upload to storage
        const photoUrl = await uploadFilePromise(
          userPhotoRef(uid),
          firstImage,
          progress => {
            setRequestProgress(progress.toFixed(2));
          },
        );

        nweFields.photoURL = photoUrl;
      }

      if (inputValue !== '') {
        nweFields.displayName = inputValue;
      }
      if (Object.keys(nweFields).length > 0) {
        await updateUserDoc(uid, nweFields);
      }

      setIsRequest(false);
    } catch (err) {
      setErrorMessage(err.message);
      setIsRequest(false);
    }
    return null;
  };

  return (
    <Modal.Wrapper onSubmit={handleSubmitChange}>
      <Modal.Toggler
        render={toggle => (
          <ClearButton title="Edytuj profil" onClick={toggle}>
            <span className="sr-only">Edytuj profil</span>
            <i className="fa fa-pencil" aria-hidden="true" />
          </ClearButton>
        )}
      />
      <Modal.Content>
        <StyledModalContent>
          <LoadingBar
            progress={requestProgress}
            role="presentation"
          />
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
            <input ref={imageRef} type="file" name="avatarPhoto" />
          </Label>
          {errorMessage && <p>{errorMessage}</p>}
          {isRequest && <p>Ładowanie {requestProgress}%</p>}
        </StyledModalContent>
      </Modal.Content>
    </Modal.Wrapper>
  );
};

export default UserUpdateSettings;
