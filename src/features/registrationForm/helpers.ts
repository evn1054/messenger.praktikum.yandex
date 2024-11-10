import {
  emailRules,
  loginRules, nameRules,
  passwordRules, phoneRules, validateInputField,
} from '@features/helpers.ts';
import * as commonRules from '@features/rules.ts';
import { Input } from '@components/input';
import {
  registrationEmailField, registrationFirstNameField, registrationLastNameField,
  registrationLoginField,
  registrationPasswordAgainField,
  registrationPasswordField, registrationPhoneField,
} from '@features/registrationForm/RegistrationForm';

export const passwordAgainRules = [
  commonRules.callback(
    (value: string) => {
      const element = (registrationPasswordField._children.input as Input).getElement()?.children[0] as HTMLInputElement;
      return element?.value === value;
    },
    'Пароли должны совпадать',
  ),
];
export const validateLogin = () => validateInputField(registrationLoginField, loginRules);
export const validatePassword = () => validateInputField(registrationPasswordField, passwordRules);
export const validatePasswordAgain = () => validateInputField(registrationPasswordAgainField, passwordAgainRules);
export const validateEmail = () => validateInputField(registrationEmailField, emailRules);
export const validateFirstName = () => validateInputField(registrationFirstNameField, nameRules);
export const validateLastName = () => validateInputField(registrationLastNameField, nameRules);
export const validatePhone = () => validateInputField(registrationPhoneField, phoneRules);
