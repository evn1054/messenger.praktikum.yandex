import {
  loginRules, passwordRules, validateInputField,
} from '@features/helpers.ts';
import { loginField, passwordField } from '@features/LoginForm/LoginForm';

export const validateLogin = () => validateInputField(loginField, loginRules);

export const validatePassword = () => validateInputField(passwordField, passwordRules);

export const validateLoginForm = (e: Event) => {
  e.preventDefault();

  const loginValid = validateLogin();
  const passwordValid = validatePassword();

  const isValid = loginValid && passwordValid;

  if (isValid) {
    const formData = new FormData(e.target as HTMLFormElement);
    const values = Object.fromEntries(formData.entries());
    console.log('FORM VALUES >>>>>>', values);
  }
};
