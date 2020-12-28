import { RegisteValues, RegError } from 'types';

export const isFormValid = (
  registerValues: RegisteValues,
): RegError[] | true => {
  let errors: RegError[] = [];
  let error: RegError;

  if (isFormEmpty(registerValues)) {
    error = { message: 'Fill in all fields' };
    errors = errors.concat(error);
    return errors;
  } else if (!isPasswordValid(registerValues)) {
    error = { message: 'Password is invalid' };
    errors = errors.concat(error);
    return errors;
  } else {
    return true;
  }
};
export const handleInputError = (errors: RegError[], inputName: string) => {
  return errors.some((error) => error.message.toLowerCase().includes(inputName))
    ? 'error'
    : '';
};

const isFormEmpty = ({
  username,
  email,
  password,
  confirmPassword,
}: RegisteValues): boolean => {
  return (
    !username.length ||
    !email.length ||
    !password.length ||
    !confirmPassword.length
  );
};

const isPasswordValid = ({
  password,
  confirmPassword,
}: RegisteValues): boolean => {
  if (password.length > 5 && password === confirmPassword) {
    return true;
  }
  return false;
};
