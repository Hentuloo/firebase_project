import { uploadFilePromise, userPhotoRef } from 'fb/storage';
import { updateUserDoc } from 'fb/controllers/userProfile';

import { validImageFile } from 'config/utils';
import { types } from './types';

interface SubmitFormProps {
  imageRef: React.RefObject<HTMLInputElement>;
  inputValue: string;
  uid: string;
  updateProgress: number | ((number: any) => void);
}

export const submitForm = ({
  imageRef,
  inputValue,
  uid,
  updateProgress,
}: SubmitFormProps) => async (dispatch: any) => {
  const image = imageRef.current;
  if (!image || !image.files) return;

  dispatch({ type: types.RESET_ERROR_MESSAGE, payload: null });

  const nweFields = {} as {
    photoURL: null | string;
    displayName: null | string;
  };
  const firstImage = image.files[0];

  try {
    dispatch({ type: types.START_REQUEST });
    if (firstImage) {
      const { ok, message } = validImageFile(firstImage);
      if (!ok) throw new Error(message);

      // upload to storage
      const photoUrl = await uploadFilePromise(
        userPhotoRef(uid),
        firstImage,
        updateProgress,
      );

      nweFields.photoURL = photoUrl as string;
    }

    if (inputValue !== '') nweFields.displayName = inputValue;

    if (Object.keys(nweFields).length > 0)
      await updateUserDoc(uid, nweFields);

    dispatch({ type: types.REQUEST_SUCCESSFUL });
  } catch (err) {
    dispatch({ type: types.REQUEST_FAILURE, payload: err.message });
  }
  return null;
};
