import firebase from '../index';

type StorageRefType = firebase.storage.Reference;
export class Storage {
  public instance: StorageRefType;

  public uid: string;

  static init = (uid: string) => {
    return new Storage(uid);
  };

  constructor(uid: string, firebaseAuth?: StorageRefType) {
    this.uid = uid;
    this.instance = firebaseAuth || firebase.storage().ref();
  }

  public getPhotoRef = () =>
    this.instance.child(`${this.uid}/avatar.jpg`);

  public uploadImage = (
    file: Blob | Uint8Array | ArrayBuffer,
    onChange: any,
  ) => {
    return new Promise((resolve, reject) => {
      this.getPhotoRef()
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
              const url = await this.getPhotoRef().getDownloadURL();
              resolve(url);
            } catch (err) {
              reject(err);
            }
          },
        );
    });
  };
}
