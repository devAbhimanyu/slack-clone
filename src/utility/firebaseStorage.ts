import mime from 'mime-types';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'config/firebase.prod';
const storageRef = firebase.storage().ref();
const validTypes = ['image/jpeg', 'image/png'];

export const uploadFile = (file: File) => {
  const metadata = { contentType: mime.lookup(file.name) as string };
  const filePath = `chat/public/${uuidv4()}.jpg`;
  return storageRef.child(filePath).put(file, metadata);
};

export const validateFileType = (name: string): boolean => {
  const lookup = mime.lookup(name) as string;
  return lookup && validTypes.includes(lookup) ? true : false;
};
