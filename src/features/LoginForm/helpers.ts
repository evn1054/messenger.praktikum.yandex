import { validateField } from '@features/helpers.ts';
import * as commonRules from '@features/rules.ts';
import { loginField, passwordField } from '@features/LoginForm/LoginForm';

export const validateLogin = () => validateField(loginField, [
  commonRules.required(),
  commonRules.minLength(3),
  commonRules.maxLength(20),
  commonRules.withLetters(),
  commonRules.withoutSpaces(),
  commonRules.withoutSpecCharacters(['-', '_']),
  commonRules.latinOnly(),
]);

export const validatePassword = () => validateField(passwordField, [
  commonRules.required(),
  commonRules.minLength(8),
  commonRules.maxLength(40),
  commonRules.pattern(/^(?=.*[A-ZА-Я])(?=.*\d)/, 'Обязательно хотя бы одна заглавная буква и цифра.'),
  commonRules.latinOnly(),
]);
