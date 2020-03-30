import { uploadFilePromise, userPhotoRef } from 'fb/storage';
import { updateUserDoc } from 'fb/controllers/userProfile';

import { validImageFile } from 'config/utils';
import { types } from './types';

export const submitForm = ({
  imageRef,
  inputValue,
  uid,
  updateProgress,
}) => async dispatch => {
  dispatch({ type: types.RESET_ERROR_MESSAGE, payload: null });

  const nweFields = {};
  const firstImage = imageRef.current.files[0];

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

      nweFields.photoURL = photoUrl;
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
