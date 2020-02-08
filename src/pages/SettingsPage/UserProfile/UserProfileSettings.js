import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { updateUserPhoto } from 'fb/storage';
import { updateUserDoc } from 'fb/firestore';

import { ClearButton, TextInput } from 'components/atoms';
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
  const [errorMessage, setErrorMessage] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const imageRef = useRef(null);

  const { displayName, uid } = useSelector(state => state.user);

  const handleInputChange = e => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleSubmitChange = async () => {
    const firstImage = imageRef.current.files[0];
    const { ok, message } = validImageFile(firstImage);

    if (!ok) return setErrorMessage(message);
    try {
      const photoSnap = await updateUserPhoto(firstImage);
      const url = await photoSnap.ref.getDownloadURL();
      await updateUserDoc(uid, { photoURL: url });
    } catch (err) {
      setErrorMessage(err.message);
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
            <span>Prześlij inne zdjęcie:</span>
            <input ref={imageRef} type="file" name="avatarPhoto" />
          </Label>
          <p>{errorMessage}</p>
        </StyledModalContent>
      </Modal.Content>
    </Modal.Wrapper>
  );
};

export default UserUpdateSettings;
