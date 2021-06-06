import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import firebaseDev from './firebase.dev';
import firebaseProd from './firebase.prod';
const firebaseConfig =
  process.env.NODE_ENV === 'development' ? firebaseDev : firebaseProd;

firebase.initializeApp(firebaseConfig);
export default firebase;
