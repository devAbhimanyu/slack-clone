export type Login = {
  email: string;
  password: string;
};
export interface RegisteValues extends Login {
  username: string;
  confirmPassword: string;
}
export type RegError = {
  message: string;
};

// export type CustError
