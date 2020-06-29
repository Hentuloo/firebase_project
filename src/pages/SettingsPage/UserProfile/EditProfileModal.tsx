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
import { getUser } from 'store/selectors/user.selector';
import { useFormik } from 'formik';
import {
  validImageFile,
  validator,
  getFirstValidatorError,
} from 'utils/validator';
import { toast } from 'react-toastify';
import { Constants } from 'config/Constants';
import { Storage, FireFunctions } from 'fb';

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
interface FormStateType {
  isRequest: boolean;
  nick: string;
  closeModal: boolean;
  photo: string | undefined;
  errorMessage: string | null;
}

interface EditProfileModal {
  toggleActive: () => any;
}

const EditProfileModal: FC<EditProfileModal> = ({ toggleActive }) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [progress, updateProgress] = useProgressBar();
  const { displayName, uid } = useSelector(getUser);
  const formik = useFormik<FormStateType>({
    initialValues: {
      isRequest: false,
      errorMessage: null,
      nick: '',
      closeModal: false,
      photo: undefined,
    },
    onSubmit: async (values, { setFieldValue }) => {
      const image = imageRef.current;
      let photoURL: string | undefined;
      if (values.isRequest || !uid || !image || !image.files) return;

      try {
        const firstImage = image.files[0];
        setFieldValue('isRequest', true);
        if (firstImage) {
          const { ok, message } = validImageFile(firstImage);
          if (!ok) throw new Error(message);

          const { uploadImage } = Storage.init(uid);
          photoURL = (await uploadImage(
            firstImage,
            updateProgress,
          )) as string;
        }

        const validation = validator(
          { nick: values.nick },
          {
            nick: [
              'min:4',
              'max:15',
              'regex:/^[a-zA-Z0-9ęółśążźćńĘÓŁŚĄŻŹĆŃ ]{4,15}$/i',
            ],
          },
        );
        if (validation.fails()) {
          throw new Error(
            getFirstValidatorError(validation.errors) ||
              'coś jest nie tak z nazwą',
          );
        }
        await FireFunctions.init().updateUser({
          displayName: values.nick,
          photoURL,
        });

        setFieldValue('isRequest', false);
        setFieldValue('closeModal', true);
      } catch (err) {
        toast.error(
          Constants.firebaseErrors[err.code] || err.message,
        );
        setFieldValue('isRequest', false);
        setFieldValue('closeModal', false);
      }
      return null;
    },
  });

  useEffect(() => {
    if (formik.values.closeModal) toggleActive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.closeModal]);

  return (
    <Wrapper toggleActive={toggleActive}>
      <FormWrapper onSubmit={formik.handleSubmit}>
        <LoadingBar
          progress={progress as number}
          role="presentation"
        />
        <Label>
          <span>Zmień swoją nazwę:</span>
          <TextInput
            type="text"
            name="nick"
            value={formik.values.nick}
            onChange={formik.handleChange}
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
        {formik.values.isRequest && <p>Ładowanie {progress} %</p>}
      </FormWrapper>
    </Wrapper>
  );
};

export default EditProfileModal;
