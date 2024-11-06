import * as commonRules from '@features/rules.ts';
import { InputField } from '@components/inputField';
import { Input } from '@components/input';
import { EditableField } from '@components/editableField';

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
  field: InputField | EditableField,
  validators: ((value: string) => ValidationResult)[],
) => {
  const inputChild = field._children.input;
  if (!(inputChild instanceof Input)) {
    throw new Error('Input component is not found in children.');
  }

  const element = inputChild._element?.children[0] as HTMLInputElement | null;
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

type Validator = () => boolean;
export const validateForm = (e: Event, fieldValidators: Record<string, Validator>) => {
  e.preventDefault();

  const validationResults = Object.entries(fieldValidators).map(([fieldName, validator]) => ({
    field: fieldName,
    isValid: validator(),
  }));

  const isValid = validationResults.every((result) => result.isValid);

  if (isValid) {
    const formData = new FormData(e.target as HTMLFormElement);
    const values = Object.fromEntries(formData.entries());
    console.log('FORM VALUES >>>>>>', values);
  }
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
