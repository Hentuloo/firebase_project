import { validImageFile } from 'utils';
import { Storage, FireFunctions } from 'fb';
import { toast } from 'react-toastify';
import { Constants } from 'config/Constants';
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

  const nweFields = {} as {
    photoURL?: string;
    displayName?: string;
  };
  const firstImage = image.files[0];

  try {
    dispatch({ type: types.START_REQUEST });
    if (firstImage) {
      const { ok, message } = validImageFile(firstImage);
      if (!ok) throw new Error(message);

      const { uploadImage } = Storage.init(uid);
      const photoUrl = await uploadImage(firstImage, updateProgress);

      nweFields.photoURL = photoUrl as string;
    }

    if (inputValue !== '') nweFields.displayName = inputValue;

    if (Object.keys(nweFields).length > 0)
      await FireFunctions.init().updateUser(nweFields);

    dispatch({ type: types.REQUEST_SUCCESSFUL });
  } catch (err) {
    toast.error(Constants.firebaseErrors[err.code] || err.message);
    dispatch({ type: types.REQUEST_FAILURE });
  }
  return null;
};
