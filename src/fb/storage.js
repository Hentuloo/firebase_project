import firebase from './index';

export const storageRef = firebase.storage().ref();

export const userPhotoRef = uid =>
  storageRef.child(`${uid}/avatar.jpg`);

export const uploadFilePromise = (ref, file, onChange) => {
  return new Promise((resolve, reject) => {
    ref.put(file).on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onChange(progress);
      },
      err => reject(err),
      async () => {
        try {
          const url = await ref.getDownloadURL();
          resolve(url);
        } catch (err) {
          reject(err);
        }
      },
    );
  });
};
