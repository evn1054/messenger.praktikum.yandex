import {
  emailRules,
  loginRules, nameRules,
  passwordRules, phoneRules, validateInputField,
} from '@features/helpers.ts';
import {
  emailField, firstNameField, lastNameField, loginField, passwordAgainField, passwordField, phoneField,
} from '@features/RegistrationForm/RegistrationForm';
import * as commonRules from '@features/rules.ts';
import { Input } from '@components/input';

export const passwordAgainRules = [
  commonRules.callback(
    (value: string) => {
      const element = (passwordField._children.input as Input)._element!.children[0] as HTMLInputElement;
      return element?.value === value;
    },
    'Пароли должны совпадать',
  ),
];
export const validateLogin = () => validateInputField(loginField, loginRules);
export const validatePassword = () => validateInputField(passwordField, passwordRules);
export const validatePasswordAgain = () => validateInputField(passwordAgainField, passwordAgainRules);
export const validateEmail = () => validateInputField(emailField, emailRules);
export const validateFirstName = () => validateInputField(firstNameField, nameRules);
export const validateLastName = () => validateInputField(lastNameField, nameRules);
export const validatePhone = () => validateInputField(phoneField, phoneRules);

export const validateRegistrationForm = (e: Event) => {
  e.preventDefault();

  // TODO: Можно наверное ещё раз не проверять валидацию, а пропсом передавать массив ошибок из формы или состояние. Сделать позже
  const loginValid = validateLogin();
  const passwordValid = validatePassword();
  const passwordAgainValid = validatePasswordAgain();
  const emailValid = validateEmail();
  const firstNameValid = validateFirstName();
  const lastNameValid = validateLastName();
  const phoneValid = validatePhone();

  const isValid = loginValid && passwordValid && passwordAgainValid && emailValid && firstNameValid && lastNameValid && phoneValid;

  if (isValid) {
    const formData = new FormData(e.target as HTMLFormElement);
    const values = Object.fromEntries(formData.entries());
    console.log('REGISTRATION FORM VALUES >>>>>>', values);
  }
};
