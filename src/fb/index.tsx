import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/database';
import firebaseConfig from 'config/firebaseConfig.protected';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;

export * from './controllers';
