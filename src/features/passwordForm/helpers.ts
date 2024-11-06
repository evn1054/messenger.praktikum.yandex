import {
  profileNewPasswordAgainField,
  profileNewPasswordField,
  profileOldPasswordField,
} from '@features/passwordForm/passwordForm';
import { passwordRules, validateInputField } from '@features/helpers.ts';
import * as commonRules from '@features/rules.ts';
import { Input } from '@components/input';

export const passwordAgainRules = [
  commonRules.callback(
    (value: string) => {
      const element = (profileNewPasswordField._children.input as Input)._element!.children[0] as HTMLInputElement;
      return element?.value === value;
    },
    'Пароли должны совпадать',
  ),
];
export const validateProfileOldPassword = () => validateInputField(profileOldPasswordField, passwordRules);
export const validateProfileNewPassword = () => validateInputField(profileNewPasswordField, passwordRules);
export const validateProfileNewPasswordAgain = () => validateInputField(profileNewPasswordAgainField, passwordAgainRules);
