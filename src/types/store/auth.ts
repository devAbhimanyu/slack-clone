import firebase from 'firebase';

export type Firebase = typeof firebase;
export type FirebaseUser = firebase.UserInfo;

export type LoginValues = {
  email: string;
  password: string;
};
export interface RegisteValues extends LoginValues {
  username: string;
  confirmPassword: string;
}
export type RegError = {
  message: string;
};

export interface AuthState {
  userData: FirebaseUser | null;
  loader: boolean;
  error?: any;
}
