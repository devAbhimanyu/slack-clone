import firebaseDev from './firebase.dev';
import firebaseProd from './firebase.prod';
import { Firebase } from 'types';
const firebase: Firebase =
  process.env.NODE_ENV === 'development' ? firebaseDev : firebaseProd;

export default firebase;
