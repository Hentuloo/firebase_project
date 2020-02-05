import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDhLqGd_9MZMQOF76Tr7TM2W9rVFUnYI2s',
  authDomain: 'typing-page.firebaseapp.com',
  databaseURL: 'https://typing-page.firebaseio.com',
  projectId: 'typing-page',
  storageBucket: 'typing-page.appspot.com',
  messagingSenderId: '980265800534',
  appId: '1:980265800534:web:1a82d2315ceb21a0d17cf7',
  measurementId: 'G-LXZ47TJVY8',
};

export const app = firebase.app();
export const firestore = firebase.firestore(app);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
