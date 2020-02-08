import firebase from './index';

export const storageRef = firebase.storage().ref();

export const userPhotoRef = storageRef.child('images/avatar.jpg');

export const updateUserPhoto = file => userPhotoRef.put(file);
