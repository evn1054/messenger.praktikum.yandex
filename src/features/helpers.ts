import * as commonRules from '@features/rules.ts';
import { InputField } from '@components/inputField';

interface ValidationResult {
    isValid: boolean;
    message: string;
}

export const validate = (value: string, commonRulesArr: ((val: string) => ValidationResult)[]): string[] => {
  const errorMessages: string[] = [];

  commonRulesArr.forEach((validator) => {
    const result = validator(value || '');

    if (!result.isValid) {
      errorMessages.push(result.message);
    }
  });

  return errorMessages;
};

export const validateInputField = (
  field: InputField,
  validators: ((value: string) => ValidationResult)[],
) => {
  const element = field._children.input._element.children[0] as HTMLInputElement | null;

  if (!element) {
    throw new Error('Input is not found.');
  }

  const errors = validate(element.value || '', validators);

  field.setProps({
    help: errors?.[0],
    status: errors.length ? 'error' : undefined,
  });

  return errors.length === 0;
};

export const loginRules = [
  commonRules.required(),
  commonRules.withLetters(),
  commonRules.minLength(3),
  commonRules.maxLength(20),
  commonRules.latinOnly(),
  commonRules.withoutSpaces(),
  commonRules.withoutSpecCharacters(['-', '_']),
  commonRules.latinOnly(),
];

export const passwordRules = [
  commonRules.required(),
  commonRules.minLength(8),
  commonRules.maxLength(40),
  commonRules.pattern(/^(?=.*[A-ZА-Я])(?=.*\d)/, 'Обязательно хотя бы одна заглавная буква и цифра.'),
  commonRules.latinOnly(),
];

export const emailRules = [commonRules.email()];

export const nameRules = [
  commonRules.withoutSpecCharacters(['-']),
  commonRules.withoutSpaces(),
  commonRules.withoutNumbers(),
];

export const phoneRules = [
  commonRules.minLength(9),
  commonRules.maxLength(11),
  commonRules.phone(),
];
