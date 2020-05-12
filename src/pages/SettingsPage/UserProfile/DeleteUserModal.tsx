import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { TextInput, ClearButton } from 'components/atoms';
import { Modal } from 'components/molecules';

const Wrapper = styled(Modal)`
  max-width: 400px;
`;
const FormWrapper = styled.form`
  display: grid;
  grid-row-gap: 25px;
  padding: 30px 30px 10px;
`;

const Label = styled.label`
  display: grid;
  grid-column-gap: 7px;
  align-items: center;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-auto-flow: column;
  }
`;

interface EditProfileModal {
  toggleActive: () => any;
  handleSubmit: (val: string) => any;
}

const EditProfileModal: FC<EditProfileModal> = ({
  toggleActive,
  handleSubmit,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = ({
    target,
  }: {
    target: HTMLInputElement;
  }) => {
    const { value } = target;
    setInputValue(value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(inputValue);
  };

  return (
    <Wrapper toggleActive={toggleActive}>
      <FormWrapper onSubmit={handleFormSubmit}>
        <Label>
          <span>Potwierdź hasło:</span>
          <TextInput
            type="password"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="hasło"
          />
        </Label>
        <ClearButton type="submit">Usuń konto</ClearButton>
      </FormWrapper>
    </Wrapper>
  );
};

export default EditProfileModal;
