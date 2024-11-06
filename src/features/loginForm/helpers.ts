import {
  loginRules, passwordRules, validateInputField,
} from '@features/helpers.ts';
import { loginField, passwordField } from '@features/loginForm/LoginForm';

export const validateLogin = () => validateInputField(loginField, loginRules);

export const validatePassword = () => validateInputField(passwordField, passwordRules);
