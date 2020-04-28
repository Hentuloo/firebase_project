import firebase from './index';

export const storageRef = firebase.storage().ref();

export const userPhotoRef = (uid: string) =>
  storageRef.child(`${uid}/avatar.jpg`);

export const uploadFilePromise = (
  ref: firebase.storage.Reference,
  file: Blob | Uint8Array | ArrayBuffer,
  onChange: any,
) => {
  return new Promise((resolve, reject) => {
    ref
      .put(file, {
        cacheControl: 'public,max-age=3000',
        contentType: 'image/jpeg',
      })
      .on(
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
