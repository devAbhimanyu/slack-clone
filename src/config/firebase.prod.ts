import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  databaseURL: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
